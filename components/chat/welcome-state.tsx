import { categoryCards } from "@/lib/mock-data";
import { CategoryCard } from "./category-card";

interface WelcomeStateProps {
  onSelectCategory: (text: string) => void;
}

export function WelcomeState({ onSelectCategory }: WelcomeStateProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent text-accent-fg">
          {/* eslint-disable-next-line @next/next/no-img-element -- bot-icon.svg wraps a base64 PNG, next/image would require dangerouslyAllowSVG */}
          <img src="/img/bot-icon.svg" alt="DenimHouse AI" className="h-full w-full object-cover" />
        </span>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            ¡Hola! Soy DenimHouse AI 
          </h2>
          <p className="mt-1 max-w-xl text-muted-fg">
            Puedo ayudarte a encontrar información sobre nuestros productos, ventas,
            políticas, tallas y mucho más.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {categoryCards.map((card) => (
          <CategoryCard key={card.id} card={card} onSelect={onSelectCategory} />
        ))}
      </div>
    </div>
  );
}
