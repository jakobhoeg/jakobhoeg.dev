import React from 'react';
import Markdown from 'markdown-to-jsx';
import cx from '@/utils/cx';
import { Message as MessageProps } from 'ai/react';

const Message: React.FC<MessageProps> = ({ content, role }) => {
  const isUser = role === 'user';

  return (
    <article
      className={cx(
        'mb-4 flex items-start gap-4 rounded-2xl p-4 md:p-5',
        isUser ? '' : 'bg-emerald-50',
      )}
    >
      <Avatar isUser={isUser} />
      <Markdown
        className={cx(
          'space-y-4 py-1.5 md:py-1',
          isUser ? 'font-semibold' : '',
        )}
        options={{
          overrides: {
            ol: ({ children }) => <ol className="list-decimal">{children}</ol>,
            ul: ({ children }) => <ol className="list-disc">{children}</ol>,
          },
        }}
      >
        {content}
      </Markdown>
    </article>
  );
};

const Avatar: React.FC<{ isUser?: boolean; className?: string }> = ({
  isUser = false,
  className,
}) => {
  return (
    <div
      className={cx(
        'flex size-8 shrink-0 items-center justify-center rounded-full',
        isUser ? 'bg-gray-200 text-gray-700' : 'bg-emerald-950',
        className,
      )}
    >
      {isUser ? 'U' : 'A'}
    </div>
  );
};

export default Message;
export { Avatar };
