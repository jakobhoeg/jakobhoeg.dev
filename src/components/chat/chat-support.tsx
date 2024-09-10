'use client'

import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat/chat-bubble'
import { ChatInput } from '@/components/ui/chat/chat-input'
import { ExpandableChat, ExpandableChatHeader, ExpandableChatBody, ExpandableChatFooter } from '@/components/ui/chat/expandable-chat'
import { ChatMessageList } from '@/components/ui/chat/chat-message-list'
import { Bot, Send } from 'lucide-react'
import { useChat } from 'ai/react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import Markdown from 'markdown-to-jsx'

export default function ChatSupport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '0',
        role: 'system',
        content: `**Hi, I'm Jakobs assistant!**

If you have any questions about Jakob, feel free to ask me. If theres anything I can't answer, please reach out to Jakob directly.`,
      },
    ],
    onResponse(response) {
      if (response) {
        setIsGenerating(false);
      }
    },
    onError(error) {
      if (error) {
        setIsGenerating(false);
      }
    },
  });

  const messagesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    handleSubmit(e);
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isGenerating || isLoading || !input) return;
      setIsGenerating(true);
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  }

  return (
    <ExpandableChat
      size='md'
      position='bottom-right'
      icon={<Bot className='size-6' />}
    >
      <ExpandableChatBody>
        <ChatMessageList className='bg-muted/25 p-10' ref={messagesRef}>

          {/* Messages */}
          {messages && messages.map((message, index) => (
            <ChatBubble
              key={index}
              variant={message.role == 'user' ? 'sent' : 'received'}>
              <ChatBubbleAvatar
                src='' fallback={message.role == 'user' ? '👤' : '🤖'}
              />
              <ChatBubbleMessage
                variant={message.role == 'user' ? 'sent' : 'received'}>
                <Markdown>
                  {message.content}
                </Markdown>
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {/* Loading */}
          {isGenerating && (
            <ChatBubble variant='received'>
              <ChatBubbleAvatar
                src='' fallback='🤖'
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter className='bg-muted/25'>
        <form
          ref={formRef}
          className='flex relative gap-2'
          onSubmit={onSubmit}>
          <ChatInput
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            className="min-h-12 bg-background shadow-none "
          />
          <Button
            className='absolute top-1/2 right-2 transform  -translate-y-1/2'
            type="submit" size="icon"
            disabled={isLoading || isGenerating || !input}
          >
            <Send className="size-4" />
          </Button>
        </form>
        <p className='text-xs text-center pt-2'>Build your own with <a className='font-bold' href="https://github.com/jakobhoeg/shadcn-chat" target="_blank" rel="noreferrer noopener">@shadcn-chat</a></p>
      </ExpandableChatFooter>
    </ExpandableChat>
  )
}