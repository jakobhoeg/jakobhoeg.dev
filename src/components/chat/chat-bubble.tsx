'use client';

import { ChatBubbleIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import React from 'react';
import Chat from './chat';
import { BotMessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

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
    <AnimatePresence>
      <div
        className={`fixed ${showChat ? 'bottom-0 right-0' : 'bottom-3 right-3'}  z-[40] sm:rounded-full md:bottom-8 md:right-10 md:max-h-full`}
      >
        {showChat ? (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              opacity: { duration: 0.1 },
              layout: {
                type: 'spring',
                duration: 0.5,
                bounce: 0.05,
              },
            }}
            className="h-[calc(100dvh)] bg-background p-4 shadow-2xl dark:bg-card sm:h-full sm:rounded-lg sm:border"
          >
            <div className="flex w-full justify-end " onClick={handleClick}>
              <ChevronDownIcon className="h-5 w-5 cursor-pointer" />
            </div>
            <Chat />
          </motion.div>
        ) : (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              opacity: { duration: 0.1 },
              layout: {
                type: 'spring',
                duration: 0.5,
                bounce: 0.05,
              },
            }}
            className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-sky-400 shadow-2xl dark:bg-neutral-700 "
            onClick={handleClick}
          >
            <BotMessageSquare className="relative h-6 w-6 text-white" />
            {unreadMessages > 0 && (
              <div className="absolute right-0 top-0 flex h-6 w-6 animate-bounce items-center justify-center rounded-full border border-zinc-900 border-opacity-5 bg-red-500/80 backdrop-blur">
                <p className="text-xs text-white">
                  {unreadMessages > 9 ? '+9' : unreadMessages}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
