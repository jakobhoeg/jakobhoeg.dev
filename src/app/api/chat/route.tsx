import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { AIMessage, ChatMessage, HumanMessage } from '@langchain/core/messages';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { createRetrieverTool } from 'langchain/tools/retriever';
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { UpstashVectorStore } from '@/app/vectorstore/UpstashVectorStore';

export const runtime = 'edge';

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, '10 s'),
});

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === 'user') {
    console.log('User message:', message.content);
    return new HumanMessage(message.content);
  } else if (message.role === 'assistant') {
    console.log('AI message:', message.content);
    return new AIMessage(message.content);
  } else {
    console.log('Chat message:', message.content);
    return new ChatMessage(message.content, message.role);
  }
};

export async function POST(req: NextRequest) {
  try {
    console.log('Request received.');

    const ip = req.ip ?? '127.0.0.1';
    console.log('IP:', ip);

    const { success } = await ratelimit.limit(ip);
    console.log('Rate limit success:', success);

    if (!success) {
      const textEncoder = new TextEncoder();
      const customString =
        "Oops! It seems you've reached the rate limit. Please try again later.";

      const transformStream = new ReadableStream({
        async start(controller) {
          controller.enqueue(textEncoder.encode(customString));
          controller.close();
        },
      });
      console.log('Rate limit exceeded. Sending error response.');
      return new StreamingTextResponse(transformStream);
    }

    const body = await req.json();

    const messages = (body.messages ?? []).filter(
      (message: VercelChatMessage) =>
        message.role === 'user' || message.role === 'assistant',
    );
    console.log('Filtered messages:', messages);

    const returnIntermediateSteps = false;
    console.log('Return intermediate steps:', returnIntermediateSteps);

    const previousMessages = messages
      .slice(0, -1)
      .map(convertVercelMessageToLangChainMessage);
    console.log('Previous messages:', previousMessages);

    const currentMessageContent = messages[messages.length - 1].content;
    console.log('Current message content:', currentMessageContent);

    const chatModel = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo-1106',
      temperature: 0.2,
      // IMPORTANT: Must "streaming: true" on OpenAI to enable final output streaming below.
      streaming: true,
    });

    /**
     * Create vector store and retriever
     */
    const vectorstore = await new UpstashVectorStore(new OpenAIEmbeddings());
    const retriever = vectorstore.asRetriever({
      k: 6,
      searchType: 'mmr',
      searchKwargs: {
        fetchK: 20,
        lambda: 0.5,
      },
      verbose: false,
    });
    console.log('Vector store and retriever created.');

    /**
     * Wrap the retriever in a tool to present it to the agent in a
     * usable form.
     */
    const tool = createRetrieverTool(retriever, {
      name: 'search_latest_knowledge',
      description: 'Searches and returns up-to-date general information.',
    });
    console.log('Retriever tool created.');

    const AGENT_SYSTEM_TEMPLATE = `
    You are an artificial intelligence chat bot that can provide information only about Jakob. Jakob is the owner of this website. 

    Begin your answers with a formal greeting and sign off with a closing statement.

    Don't repeat yourself in your responses even if some information is repeated in the context.
    
    Reply with apologies and tell the user that you don't know the answer only when you are faced with a question whose answer is not available in the context.
    `;

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', AGENT_SYSTEM_TEMPLATE],
      new MessagesPlaceholder('chat_history'),
      ['human', '{input}'],
      new MessagesPlaceholder('agent_scratchpad'),
    ]);

    const agent = await createOpenAIFunctionsAgent({
      llm: chatModel,
      tools: [tool],
      prompt,
    });
    console.log('OpenAI agent created.');

    const agentExecutor = new AgentExecutor({
      agent,
      tools: [tool],
      // Set this if you want to receive all intermediate steps in the output of .invoke().
      returnIntermediateSteps,
    });
    console.log('Agent executor created.');

    if (!returnIntermediateSteps) {
      /**
       * Agent executors also allow you to stream back all generated tokens and steps
       * from their runs.
       *
       * This contains a lot of data, so we do some filtering of the generated log chunks
       * and only stream back the final response.
       *
       * This filtering is easiest with the OpenAI functions or tools agents, since final outputs
       * are log chunk values from the model that contain a string instead of a function call object.
       *
       * See: https://js.langchain.com/docs/modules/agents/how_to/streaming#streaming-tokens
       */
      const logStream = await agentExecutor.streamLog({
        input: currentMessageContent,
        chat_history: previousMessages,
      });
      console.log('Log stream created.');

      const textEncoder = new TextEncoder();
      const transformStream = new ReadableStream({
        async start(controller) {
          for await (const chunk of logStream) {
            if (chunk.ops?.length > 0 && chunk.ops[0].op === 'add') {
              const addOp = chunk.ops[0];
              if (
                addOp.path.startsWith('/logs/ChatOpenAI') &&
                typeof addOp.value === 'string' &&
                addOp.value.length
              ) {
                console.log('Streamed chunk:', addOp.value);
                controller.enqueue(textEncoder.encode(addOp.value));
              }
            }
          }
          controller.close();
        },
      });
      console.log('Transform stream created.');

      return new StreamingTextResponse(transformStream);
    } else {
      /**
       * Intermediate steps are the default outputs with the executor's `.stream()` method.
       * We could also pick them out from `streamLog` chunks.
       * They are generated as JSON objects, so streaming them is a bit more complicated.
       */
      const result = await agentExecutor.invoke({
        input: currentMessageContent,
        chat_history: previousMessages,
      });
      console.log('Agent invocation result:', result);

      const urls = JSON.parse(
        `[${result.intermediateSteps[0]?.observation.replaceAll('}\n\n{', '}, {')}]`,
      ).map((source: { url: any }) => source.url);
      console.log('Parsed URLs:', urls);

      return NextResponse.json(
        {
          _no_streaming_response_: true,
          output: result.output,
          sources: urls,
        },
        { status: 200 },
      );
    }
  } catch (e: any) {
    console.error('Error:', e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
