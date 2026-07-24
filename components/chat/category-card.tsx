import type { CategoryCard as CategoryCardType } from "@/lib/types";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  card: CategoryCardType;
  onSelect: (text: string) => void;
}

export function CategoryCard({ card, onSelect }: CategoryCardProps) {
  const Icon = card.icon;

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onSelect(card.title)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(card.title);
        }
      }}
      className="flex cursor-pointer flex-col gap-3 p-4 text-left transition-colors hover:border-accent/50"
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          backgroundColor: `color-mix(in srgb, var(--${card.accentVar}) 15%, transparent)`,
          color: `var(--${card.accentVar})`,
        }}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-semibold text-foreground">{card.title}</p>
        <p className="text-sm text-muted-fg">{card.subtitle}</p>
      </div>
    </Card>
  );
}
