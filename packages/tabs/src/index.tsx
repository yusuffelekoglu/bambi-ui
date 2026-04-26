"use client";

import {
  createContext,
  useContext,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
} from "react";
import { useControllableState, useId } from "@bambi-ui/a11y";
import { cn } from "@bambi-ui/theme";
import "./tabs.css";

interface TabsContextValue {
  value: string | undefined;
  onChange: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const DEFAULT_CONTEXT: TabsContextValue = { value: undefined, onChange: () => {}, baseId: "" };

function useTabsContext(): TabsContextValue {
  return useContext(TabsContext) ?? DEFAULT_CONTEXT;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Tabs({
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [value, onChange] = useControllableState({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  });
  const baseId = useId("tabs");

  return (
    <TabsContext.Provider value={{ value, onChange, baseId }}>
      <div className={cn("bambi-tabs", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {}

export function TabList({ className, children, ...props }: TabListProps) {
  const { onChange } = useTabsContext();

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const tabs = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      ),
    );
    const currentIndex = tabs.findIndex((t) => t === document.activeElement);
    let nextIndex: number | undefined;

    if (e.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (e.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = tabs.length - 1;

    if (nextIndex !== undefined) {
      e.preventDefault();
      const next = tabs[nextIndex];
      if (next) {
        next.focus();
        const nextValue = next.dataset.value;
        if (nextValue) onChange(nextValue);
      }
    }
  }

  return (
    <div
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn("bambi-tab-list", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function Tab({ value, disabled, className, children, onClick, ...props }: TabProps) {
  const { value: activeValue, onChange, baseId } = useTabsContext();
  const isSelected = value === activeValue;

  return (
    <button
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={isSelected}
      aria-controls={`${baseId}-panel-${value}`}
      disabled={disabled}
      tabIndex={isSelected ? 0 : -1}
      data-value={value}
      onClick={(e) => {
        onChange(value);
        onClick?.(e);
      }}
      className={cn("bambi-tab", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabPanel({ value, className, children, ...props }: TabPanelProps) {
  const { value: activeValue, baseId } = useTabsContext();

  if (value !== activeValue) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn("bambi-tab-panel", className)}
      {...props}
    >
      {children}
    </div>
  );
}
