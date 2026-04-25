import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

type FocusTrapOptions = {
  /** default true */
  enabled?: boolean;
  /** focus first focusable element on mount, default true */
  autoFocus?: boolean;
  /** return focus to previously focused element on unmount, default true */
  restoreFocus?: boolean;
};

export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  options: FocusTrapOptions = {},
) {
  const { enabled = true, autoFocus = true, restoreFocus = true } = options;
  const containerRef = useRef<T>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    previousFocusRef.current = document.activeElement as HTMLElement;

    if (autoFocus) {
      const first = containerRef.current
        ?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)[0];
      first?.focus();
    }

    return () => {
      if (restoreFocus) previousFocusRef.current?.focus();
    };
  }, [enabled, autoFocus, restoreFocus]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !containerRef.current) return;
      const focusable = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled]);

  return containerRef;
}
