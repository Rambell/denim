"use client";

import { suggestedQuestions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { SuggestedQuestionItem } from "./suggested-question-item";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuestion: (text: string) => void;
}

export function Sidebar({ isOpen, onClose, onSelectQuestion }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-[280px] -translate-x-full flex-col bg-sidebar-bg transition-transform duration-200 md:static md:translate-x-0",
          isOpen && "translate-x-0"
        )}
      >
        <div className="flex flex-col gap-4 px-6 pt-8">
          <div className="flex justify-center">
            <img
              src="/img/denim-house-logo.png"
              alt="DenimHouse AI"
              className="h-30 w-30 shrink-0 object-contain"
            />
          </div>

          <h1 className="text-xl font-semibold text-sidebar-fg">DenimHouse AI</h1>
          <p className="text-sm leading-relaxed text-sidebar-fg-muted">
            Tu asistente inteligente para consultar información sobre productos, ventas
            y políticas de la tienda.
          </p>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 flex-col px-6">
          <span className="text-xs font-semibold tracking-wider text-sidebar-fg-muted">
            PREGUNTAS SUGERIDAS
          </span>
          <div className="mt-2 flex-1 overflow-y-auto pb-4 ">
            {suggestedQuestions.map((question) => (
              <SuggestedQuestionItem
                key={question.id}
                question={question}
                onSelect={(text) => {
                  onSelectQuestion(text);
                  onClose();
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 border-t border-white/10 px-6 py-5">
          <div className="h-10 w-16 rounded-t-xl " />
          <span className="text-xs text-sidebar-fg-muted"> © 2026 Matías Ramírez</span>
        </div>
      </aside>
    </>
  );
}
