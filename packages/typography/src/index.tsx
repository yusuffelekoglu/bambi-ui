import { type HTMLAttributes, type Ref } from "react";
import { cn } from "@bambi-ui/theme";
import "./typography.css";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
  level?: HeadingLevel;
  as?: HeadingElement;
}

export function Heading({ level = 1, as, ref, className, children, ...props }: HeadingProps) {
  const Tag = as ?? (`h${level}` as HeadingElement);
  return (
    <Tag ref={ref} data-level={level} className={cn("bambi-heading", className)} {...props}>
      {children}
    </Tag>
  );
}

export type TextVariant = "body" | "lead" | "small" | "muted" | "label";
export type TextElement = "p" | "span" | "div" | "label" | "strong" | "em" | "small";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  ref?: Ref<HTMLElement>;
  variant?: TextVariant;
  as?: TextElement;
}

export function Text({ variant = "body", as: Tag = "p", ref, className, children, ...props }: TextProps) {
  return (
    // @ts-expect-error — ref type varies by element, safe at runtime
    <Tag ref={ref} data-variant={variant} className={cn("bambi-text", className)} {...props}>
      {children}
    </Tag>
  );
}
