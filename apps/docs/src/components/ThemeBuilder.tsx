"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@bambi-ui/button";
import { Card } from "@bambi-ui/card";
import { Code } from "@bambi-ui/code";
import { ColorPicker } from "@bambi-ui/color-picker";
import { cn } from "@bambi-ui/theme";

// ─── Token definitions ────────────────────────────────────────────────────────

type ColorGroup = {
  label: string;
  tokens: { key: string; label: string }[];
};

const COLOR_GROUPS: ColorGroup[] = [
  {
    label: "Base",
    tokens: [
      { key: "background", label: "Background" },
      { key: "foreground", label: "Foreground" },
    ],
  },
  {
    label: "Surface",
    tokens: [
      { key: "card", label: "Card" },
      { key: "card-foreground", label: "Card Fg" },
      { key: "popover", label: "Popover" },
      { key: "popover-foreground", label: "Popover Fg" },
    ],
  },
  {
    label: "Brand",
    tokens: [
      { key: "primary", label: "Primary" },
      { key: "primary-foreground", label: "Primary Fg" },
      { key: "secondary", label: "Secondary" },
      { key: "secondary-foreground", label: "Secondary Fg" },
      { key: "accent", label: "Accent" },
      { key: "accent-foreground", label: "Accent Fg" },
    ],
  },
  {
    label: "State",
    tokens: [
      { key: "muted", label: "Muted" },
      { key: "muted-foreground", label: "Muted Fg" },
      { key: "destructive", label: "Destructive" },
      { key: "destructive-foreground", label: "Destructive Fg" },
    ],
  },
  {
    label: "Utility",
    tokens: [
      { key: "border", label: "Border" },
      { key: "input", label: "Input" },
      { key: "ring", label: "Ring" },
    ],
  },
];

const RADIUS_TOKENS = [
  { key: "radius-sm", label: "SM" },
  { key: "radius-md", label: "MD" },
  { key: "radius-lg", label: "LG" },
  { key: "radius-xl", label: "XL" },
];

const FONT_TOKENS = [
  { key: "font-sans", label: "Sans" },
  { key: "font-mono", label: "Mono" },
];

// ─── Default values (hex approximations of the oklch token defaults) ─────────

type Colors = Record<string, string>;
type Shared = Record<string, string>;

const LIGHT_DEFAULTS: Colors = {
  background: "#ffffff",
  foreground: "#171717",
  card: "#ffffff",
  "card-foreground": "#171717",
  popover: "#ffffff",
  "popover-foreground": "#171717",
  primary: "#3b72e8",
  "primary-foreground": "#fafafa",
  secondary: "#f5f5f5",
  "secondary-foreground": "#171717",
  accent: "#ebebeb",
  "accent-foreground": "#171717",
  muted: "#ebebeb",
  "muted-foreground": "#737373",
  destructive: "#dc2626",
  "destructive-foreground": "#fafafa",
  border: "#e5e5e5",
  input: "#e5e5e5",
  ring: "#3b72e8",
};

const DARK_DEFAULTS: Colors = {
  background: "#171717",
  foreground: "#fafafa",
  card: "#1e1e1e",
  "card-foreground": "#fafafa",
  popover: "#1e1e1e",
  "popover-foreground": "#fafafa",
  primary: "#5b8cf7",
  "primary-foreground": "#171717",
  secondary: "#262626",
  "secondary-foreground": "#fafafa",
  accent: "#2e2e2e",
  "accent-foreground": "#fafafa",
  muted: "#262626",
  "muted-foreground": "#a3a3a3",
  destructive: "#ef4444",
  "destructive-foreground": "#fafafa",
  border: "#404040",
  input: "#404040",
  ring: "#5b8cf7",
};

const SHARED_DEFAULTS: Shared = {
  "radius-sm": "0.25rem",
  "radius-md": "0.375rem",
  "radius-lg": "0.5rem",
  "radius-xl": "0.75rem",
  "font-sans": "system-ui, sans-serif",
  "font-mono": "ui-monospace, monospace",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ThemeBuilder() {
  const [light, setLight] = useState<Colors>(LIGHT_DEFAULTS);
  const [dark, setDark] = useState<Colors>(DARK_DEFAULTS);
  const [shared, setShared] = useState<Shared>(SHARED_DEFAULTS);
  const [copied, setCopied] = useState(false);

  // Apply light + shared tokens as inline styles so they override :root in tokens.css
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(light).forEach(([k, v]) => root.style.setProperty(`--bambi-${k}`, v));
    Object.entries(shared).forEach(([k, v]) => root.style.setProperty(`--bambi-${k}`, v));
  }, [light, shared]);

  // Apply dark tokens via an injected <style> tag (overrides .dark block in tokens.css)
  useEffect(() => {
    let tag = document.getElementById("bambi-dark-preview") as HTMLStyleElement | null;
    if (!tag) {
      tag = document.createElement("style");
      tag.id = "bambi-dark-preview";
      document.head.appendChild(tag);
    }
    const rules = Object.entries(dark)
      .map(([k, v]) => `  --bambi-${k}: ${v};`)
      .join("\n");
    tag.textContent = `.dark {\n${rules}\n}`;
  }, [dark]);

  // Remove all overrides when navigating away
  useEffect(() => {
    return () => {
      const root = document.documentElement;
      [
        ...Object.keys(LIGHT_DEFAULTS),
        ...Object.keys(SHARED_DEFAULTS),
      ].forEach((k) => root.style.removeProperty(`--bambi-${k}`));
      document.getElementById("bambi-dark-preview")?.remove();
    };
  }, []);

  const generateCSS = useCallback(() => {
    const lightLines = Object.entries({ ...light, ...shared })
      .map(([k, v]) => `  --bambi-${k}: ${v};`)
      .join("\n");
    const darkLines = Object.entries(dark)
      .map(([k, v]) => `  --bambi-${k}: ${v};`)
      .join("\n");
    return `/* @bambi-ui/theme custom theme — paste into your global.css */\n:root {\n${lightLines}\n}\n\n.dark {\n${darkLines}\n}`;
  }, [light, dark, shared]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard access denied */
    }
  };

  const handleReset = () => {
    setLight(LIGHT_DEFAULTS);
    setDark(DARK_DEFAULTS);
    setShared(SHARED_DEFAULTS);
  };

  return (
    <div>
      {/* ── Color tokens ── */}
      <section className="mb-12">
        {/* Header row */}
        <div className="mb-3 grid grid-cols-[1fr_104px_104px] items-center gap-x-6 border-b border-border pb-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Token</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">☀️ Light</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">🌙 Dark</span>
        </div>

        {COLOR_GROUPS.map((group) => (
          <div key={group.label} className="mb-5">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.tokens.map(({ key }) => (
                <div
                  key={key}
                  className="grid grid-cols-[1fr_104px_104px] items-center gap-x-6 rounded px-2 py-1 hover:bg-muted/40"
                >
                  <span className="font-mono text-xs text-foreground">--bambi-{key}</span>
                  <ColorPicker
                    value={light[key] ?? "#000000"}
                    onChange={(v) => setLight((p) => ({ ...p, [key]: v }))}
                  />
                  <ColorPicker
                    value={dark[key] ?? "#000000"}
                    onChange={(v) => setDark((p) => ({ ...p, [key]: v }))}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── Shared tokens: radius + fonts ── */}
      <section className="mb-12 grid grid-cols-2 gap-8">
        {/* Border radius */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Border Radius
          </p>
          <div className="space-y-2">
            {RADIUS_TOKENS.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-3">
                <span className="w-8 text-xs text-muted-foreground">{label}</span>
                <input
                  type="text"
                  value={shared[key] ?? ""}
                  onChange={(e) => setShared((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-24 rounded border border-border bg-muted px-2 py-1 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                {/* Visual preview swatch */}
                <div
                  className="h-6 w-6 border border-border bg-primary"
                  style={{ borderRadius: shared[key] }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Typography
          </p>
          <div className="space-y-3">
            {FONT_TOKENS.map(({ key, label }) => (
              <div key={key} className="space-y-1">
                <span className="text-xs text-muted-foreground">{label}</span>
                <input
                  type="text"
                  value={shared[key] ?? ""}
                  onChange={(e) => setShared((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-full rounded border border-border bg-muted px-2 py-1 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live preview ── */}
      <section className="mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Live Preview
        </p>
        <div className="grid grid-cols-2 gap-4">
          {(
            [
              { label: "☀️ Light", tokens: light },
              { label: "🌙 Dark", tokens: dark },
            ] as const
          ).map(({ label, tokens }) => (
            <div
              key={label}
              style={{
                backgroundColor: tokens.background,
                borderColor: tokens.border,
                borderRadius: shared["radius-lg"],
              }}
              className="border p-5"
            >
              <p
                style={{ color: tokens["muted-foreground"], fontSize: 10 }}
                className="mb-3 font-semibold uppercase tracking-widest"
              >
                {label}
              </p>

              <div className="mb-3 flex flex-wrap gap-2">
                <Button appName="docs" className="pointer-events-none">
                  Primary
                </Button>
                <Button appName="docs" className="pointer-events-none bg-secondary text-secondary-foreground hover:opacity-100">
                  Secondary
                </Button>
                <Button appName="docs" className="pointer-events-none bg-destructive text-destructive-foreground hover:opacity-100">
                  Destructive
                </Button>
              </div>

              <Card href="/theme" title="Card Title" className="mb-3 pointer-events-none">
                Muted description text.
              </Card>

              <p style={{ color: tokens.foreground, fontFamily: shared["font-sans"] }} className="text-xs">
                Foreground. <Code className="text-xs">code</Code> <span style={{ color: tokens["muted-foreground"] }}>muted.</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Export ── */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Export CSS
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Reset
            </button>
            <button
              onClick={handleCopy}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                copied
                  ? "bg-primary/20 text-primary"
                  : "bg-primary text-primary-foreground hover:opacity-90",
              )}
            >
              {copied ? "Copied!" : "Copy CSS"}
            </button>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted px-5 py-4 font-mono text-xs leading-relaxed text-foreground">
          {generateCSS()}
        </pre>
      </section>
    </div>
  );
}
