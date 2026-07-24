export function TypingIndicator() {
  return (
    <div className="flex w-full justify-start gap-2">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent text-accent-fg">
        {/* eslint-disable-next-line @next/next/no-img-element -- bot-icon.svg wraps a base64 PNG, next/image would require dangerouslyAllowSVG */}
        <img src="/img/bot-icon.svg" alt="DenimHouse AI" className="h-full w-full object-cover" />
      </span>
      <div className="flex items-center gap-1 px-1 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-fg [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-fg [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-fg" />
      </div>
    </div>
  );
}
