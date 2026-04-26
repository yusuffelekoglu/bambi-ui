"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@bambi-ui/theme";
import "./typography.css";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: HeadingElement;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, as, className, children, ...props }, ref) => {
    const Tag = as ?? (`h${level}` as HeadingElement);
    return (
      <Tag
        ref={ref}
        data-level={level}
        className={cn("bambi-heading", className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);

Heading.displayName = "Heading";

export type TextVariant = "body" | "lead" | "small" | "muted" | "label";
export type TextElement = "p" | "span" | "div" | "label" | "strong" | "em" | "small";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  as?: TextElement;
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ variant = "body", as: Tag = "p", className, children, ...props }, ref) => (
    <Tag
      // @ts-expect-error — ref type varies by element, safe at runtime
      ref={ref}
      data-variant={variant}
      className={cn("bambi-text", className)}
      {...props}
    >
      {children}
    </Tag>
  ),
);

Text.displayName = "Text";
