'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Message as MessageProps, useChat } from 'ai/react';
import { INITIAL_QUESTIONS } from '@/utils/const';
import Message from './message';
import MessageLoading from './message-loading';
import cx from '@/utils/cx';
import Form from './form';

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [streaming, setStreaming] = useState<boolean>(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    setMessages,
  } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '0',
        role: 'system',
        content: `**Hi, I'm Jakobs assistant!**

If you have any questions about Jakob, feel free to ask me. If theres anything I can't answer, please reach out to Jakob directly.`,
      },
    ],
    onResponse: () => {
      setStreaming(false);
    },
  });

  const onClickQuestion = (value: string) => {
    setInput(value);
    setTimeout(() => {
      formRef.current?.dispatchEvent(
        new Event('submit', {
          cancelable: true,
          bubbles: true,
        }),
      );
    }, 1);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit(e);
      setStreaming(true);
    },
    [handleSubmit],
  );

  return (
    <div className="relative mx-auto flex max-w-md flex-col p-4 sm:h-full md:p-6">
      <div className="max-h-[350px] w-full overflow-y-auto text-sm">
        {messages.map((message: MessageProps) => {
          return <Message key={message.id} {...message} />;
        })}

        {/* loading */}
        {streaming && <MessageLoading />}

        {/* initial question */}
        {messages.length === 1 && (
          <div className="mt-4 grid gap-2 md:mt-6 md:grid-cols-2 md:gap-4">
            {INITIAL_QUESTIONS.map((message) => {
              return (
                <button
                  key={message.content}
                  type="button"
                  className="cursor-pointer select-none rounded-xl border border-gray-200 bg-white
                  p-3 text-left font-normal hover:border-zinc-400 hover:bg-zinc-50 dark:border-neutral-700 dark:bg-card/20 dark:hover:bg-muted
                  md:px-4 md:py-3"
                  onClick={() => onClickQuestion(message.content)}
                >
                  {message.content}
                </button>
              );
            })}
          </div>
        )}

        {/* bottom ref */}
        <div ref={messagesEndRef} />
      </div>

      <div
        className={cx(
          'relative bottom-0 flex items-center justify-center',
          'bg-background dark:bg-card',
        )}
      >
        <span
          className="pointer-events-none absolute inset-x-0 bottom-full h-10
         bg-gradient-to-b from-white/0 to-white dark:to-card"
        />

        <div className="w-full max-w-screen-md rounded-xl px-4 py-6 md:px-5">
          <Form
            ref={formRef}
            onSubmit={onSubmit}
            inputProps={{
              disabled: streaming,
              value: input,
              onChange: handleInputChange,
            }}
            buttonProps={{
              disabled: streaming,
            }}
          />
        </div>
      </div>
    </div>
  );
}
