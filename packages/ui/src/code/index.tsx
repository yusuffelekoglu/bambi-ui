import { type JSX } from "react";
import { cn } from "../utils/cn";

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

export function Code({ children, className }: CodeProps): JSX.Element {
  return (
    <code
      className={cn(
        "rounded-sm bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
        className,
      )}
    >
      {children}
    </code>
  );
}
