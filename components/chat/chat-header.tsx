"use client";

import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onOpenSidebar: () => void;
}

export function ChatHeader({ onOpenSidebar }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={onOpenSidebar}
          aria-label="Abrir menú"
          className="h-9 w-9 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {/* eslint-disable-next-line @next/next/no-img-element -- jeans-stack.svg wraps a base64 PNG, next/image would require dangerouslyAllowSVG */}
        {/* <img src="/img/jeans-stack-only.png" alt="DenimHouse AI" className="h-8 w-8 shrink-0 object-contain" /> */}
        <span className="font-semibold text-foreground">DenimHouse AI</span>
      </div>
      <ThemeToggle />
    </header>
  );
}
