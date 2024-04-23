'use client';

import { ChatBubbleIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';
import Chat from './chat';

export default function ChatBubble() {
  const [showChat, setShowChat] = React.useState(false);
  const [unreadMessages, setUnreadMessages] = React.useState(1);

  // Set unread messages to 0 when chat is opened
  React.useEffect(() => {
    if (showChat) {
      setUnreadMessages(0);
    }
  }, [showChat]);

  const handleClick = () => {
    setShowChat(!showChat);
  };

  return (
    <div
      className={`fixed ${showChat ? 'bottom-0 right-0' : 'bottom-2 right-2'}  z-[99] rounded-full md:bottom-14 md:right-16 md:max-h-full`}
    >
      {showChat ? (
        <div className="h-full rounded-lg border bg-background p-4 shadow-md dark:bg-muted/80">
          <div className="flex w-full justify-end " onClick={handleClick}>
            <ChevronDownIcon className="h-5 w-5 cursor-pointer" />
          </div>
          <Chat />
        </div>
      ) : (
        <div
          className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white/75 shadow-md dark:bg-muted/80"
          onClick={handleClick}
        >
          <ChatBubbleIcon className="relative h-5 w-5" />
          {unreadMessages > 0 && (
            <div className="absolute right-0 top-0 flex h-6 w-6 animate-bounce items-center justify-center rounded-full border border-zinc-900 border-opacity-5 bg-red-500/80 backdrop-blur">
              <p className="text-xs text-white">
                {unreadMessages > 9 ? '+9' : unreadMessages}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
