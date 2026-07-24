"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (disabled) return;
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-border px-4 py-4 sm:px-6"
    >
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Escribe tu pregunta aquí..."
        className="flex-1 rounded-full border border-border bg-card-bg px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-fg focus:border-accent"
      />
      <Button type="submit" disabled={!value.trim() || disabled} className="h-10 w-10 shrink-0">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
