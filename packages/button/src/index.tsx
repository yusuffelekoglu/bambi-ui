"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@bambi-ui/theme";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      data-variant={variant}
      data-size={size}
      className={cn("bambi-button", className)}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = "Button";
