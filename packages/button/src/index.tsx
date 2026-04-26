import { type ButtonHTMLAttributes, type Ref } from "react";
import { cn } from "@bambi-ui/theme";
import "./index.css";

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
  ref?: Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  children,
  className,
  ref,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
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
  );
}
