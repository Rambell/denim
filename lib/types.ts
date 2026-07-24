import type { LucideIcon } from "lucide-react";

export type ChatRole = "user" | "bot";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
  icon: LucideIcon;
}

export interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentVar: string;
}
