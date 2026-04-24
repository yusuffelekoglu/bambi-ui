"use client";

import { useEffect, useRef, type JSX } from "react";
import { cn } from "../utils/cn";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps): JSX.Element {
  const textRef = useRef<HTMLInputElement>(null);
  // Track whether the text field is focused so we don't clobber the user's typing
  const isFocused = useRef(false);

  // Sync text field whenever the value prop changes from the outside
  // (native color dialog close, parent state update, etc.)
  useEffect(() => {
    if (textRef.current && !isFocused.current) {
      textRef.current.value = value;
    }
  }, [value]);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {/* Swatch + invisible native color input overlay */}
      <div className="relative h-6 w-6 shrink-0 cursor-pointer">
        <span
          className="block h-full w-full rounded-sm border border-border/60 shadow-sm"
          style={{ backgroundColor: value }}
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label="Pick color"
        />
      </div>

      {/* Uncontrolled text input — DOM value managed via ref, not React state */}
      <input
        ref={textRef}
        type="text"
        defaultValue={value}
        onFocus={() => {
          isFocused.current = true;
        }}
        onBlur={() => {
          isFocused.current = false;
          // Reset to the last valid value if the user left an incomplete string
          if (textRef.current) textRef.current.value = value;
        }}
        onChange={(e) => {
          if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
            onChange(e.target.value);
          }
        }}
        className="w-[72px] rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        maxLength={7}
        spellCheck={false}
        aria-label="Hex color value"
      />
    </div>
  );
}
