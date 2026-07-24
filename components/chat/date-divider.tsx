interface DateDividerProps {
  label: string;
}

export function DateDivider({ label }: DateDividerProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-4 sm:px-6">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-medium tracking-wider text-muted-fg">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
