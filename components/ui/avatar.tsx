import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  icon: LucideIcon;
  className?: string;
}

export function Avatar({ icon: Icon, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg",
        className
      )}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}
