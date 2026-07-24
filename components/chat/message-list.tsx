"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/lib/types";
import { DateDivider } from "./date-divider";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { WelcomeState } from "./welcome-state";

interface MessageListProps {
  messages: ChatMessage[];
  onSelectCategory: (text: string) => void;
  isTyping?: boolean;
}

export function MessageList({ messages, onSelectCategory, isTyping }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto">
      <WelcomeState onSelectCategory={onSelectCategory} />

      {messages.length > 0 && (
        <div className="flex flex-col gap-4 pb-4">
          <DateDivider label="HOY" />
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 sm:px-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
