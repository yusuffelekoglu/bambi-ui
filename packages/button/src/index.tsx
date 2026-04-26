"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@bambi-ui/theme";
import "./button.css";
import "./button-tokens.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "destructive"
  | "success"
  | "warning";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      aria-disabled={(loading || disabled) || undefined}
      disabled={disabled}
      className={cn("bambi-button", className)}
      {...props}
    >
      {loading && <span className="bambi-button-spinner" aria-hidden="true" />}
      <span className="bambi-button-content">{children}</span>
    </button>
  ),
);

Button.displayName = "Button";
