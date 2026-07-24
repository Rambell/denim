import { CheckCheck } from "lucide-react";
import type { ChatMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: ChatMessage;
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const isList = lines.every((line) => line.startsWith("- ") || line.trim() === "");

  if (isList) {
    return (
      <ul className="list-disc space-y-1 pl-5">
        {lines
          .filter((line) => line.trim() !== "")
          .map((line, index) => (
            <li key={index}>{line.replace(/^- /, "")}</li>
          ))}
      </ul>
    );
  }

  return lines.map((line, index) =>
    line.startsWith("- ") ? (
      <li key={index} className="ml-5 list-disc">
        {line.replace(/^- /, "")}
      </li>
    ) : (
      <p key={index}>{line}</p>
    )
  );
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent text-accent-fg">
          {/* eslint-disable-next-line @next/next/no-img-element -- bot-icon.svg wraps a base64 PNG, next/image would require dangerouslyAllowSVG */}
          <img src="/img/bot-icon.svg" alt="DenimHouse AI" className="h-full w-full object-cover" />
        </span>
      )}
      <div className={cn("flex max-w-[80%] flex-col gap-1", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "text-sm leading-relaxed",
            isUser
              ? "rounded-2xl rounded-br-sm bg-bubble-user-bg px-4 py-3 text-bubble-user-fg"
              : "px-1 text-foreground"
          )}
        >
          <div className="space-y-1">{renderContent(message.content)}</div>
        </div>

        <div className="flex items-center gap-1 px-1 text-xs text-muted-fg">
          <span>{message.timestamp}</span>
          {isUser && <CheckCheck className="h-3.5 w-3.5" />}
        </div>
      </div>
    </div>
  );
}
