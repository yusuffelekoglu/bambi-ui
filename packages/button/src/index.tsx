"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@bambi-ui/theme";
import { useFocusRing } from "@bambi-ui/a11y";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      onFocus,
      onBlur,
      onPointerDown,
      ...props
    },
    ref,
  ) => {
    const { isFocusVisible, focusRingProps } = useFocusRing();

    return (
      <button
        ref={ref}
        data-variant={variant}
        data-size={size}
        data-focus-visible={isFocusVisible || undefined}
        className={cn("bambi-button", className)}
        onFocus={(e) => {
          focusRingProps.onFocus();
          onFocus?.(e);
        }}
        onBlur={(e) => {
          focusRingProps.onBlur();
          onBlur?.(e);
        }}
        onPointerDown={(e) => {
          focusRingProps.onPointerDown();
          onPointerDown?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
