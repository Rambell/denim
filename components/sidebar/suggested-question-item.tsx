import type { SuggestedQuestion } from "@/lib/types";

interface SuggestedQuestionItemProps {
  question: SuggestedQuestion;
  onSelect: (text: string) => void;
}

export function SuggestedQuestionItem({ question, onSelect }: SuggestedQuestionItemProps) {
  const Icon = question.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(question.text)}
      className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-sidebar-fg transition-colors hover:bg-white/5"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
        <Icon className="h-4 w-4 text-sidebar-fg" />
      </span>
      <span className="pt-1 leading-snug">{question.text}</span>
    </button>
  );
}
