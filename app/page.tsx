"use client";

import { useState } from "react";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { MessageList } from "@/components/chat/message-list";
import { Sidebar } from "@/components/sidebar/sidebar";
import { postConsulta } from "@/lib/api";
import type { ChatMessage } from "@/lib/types";

function nowLabel() {
  return new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  async function handleSend(text: string) {
    if (isSending) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: nowLabel(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    try {
      const result = await postConsulta(text);
      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "bot",
        content: result.respuesta,
        timestamp: nowLabel(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "bot",
        content: err instanceof Error ? err.message : "Ocurrió un error inesperado.",
        timestamp: nowLabel(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectQuestion={handleSend}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <ChatHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
        <MessageList messages={messages} onSelectCategory={handleSend} isTyping={isSending} />
        <ChatInput onSend={handleSend} disabled={isSending} />
      </div>
    </div>
  );
}
