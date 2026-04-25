"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@bambi-ui/button";
import { cn } from "@bambi-ui/theme";

// ─── Preset types ─────────────────────────────────────────────────────────────

type AccentPreset = { name: string; hue: number; chroma: number };
type BasePreset = { name: string; hue: number; chroma: number };
type RadiusPreset = { name: string; sm: string; md: string; lg: string; xl: string };
type FontPreset = { name: string; label: string; value: string };

// ─── Presets ──────────────────────────────────────────────────────────────────

const ACCENTS: AccentPreset[] = [
  { name: "Blue",   hue: 250, chroma: 0.22 },
  { name: "Purple", hue: 280, chroma: 0.20 },
  { name: "Pink",   hue: 340, chroma: 0.22 },
  { name: "Red",    hue: 25,  chroma: 0.22 },
  { name: "Orange", hue: 50,  chroma: 0.20 },
  { name: "Amber",  hue: 70,  chroma: 0.18 },
  { name: "Green",  hue: 145, chroma: 0.18 },
  { name: "Teal",   hue: 185, chroma: 0.16 },
  { name: "Cyan",   hue: 200, chroma: 0.16 },
  { name: "Slate",  hue: 240, chroma: 0.05 },
];

const BASES: BasePreset[] = [
  { name: "Neutral", hue: 0,   chroma: 0 },
  { name: "Warm",    hue: 60,  chroma: 0.008 },
  { name: "Cool",    hue: 240, chroma: 0.008 },
];

const RADII: RadiusPreset[] = [
  { name: "None", sm: "0rem",     md: "0rem",     lg: "0rem",    xl: "0rem" },
  { name: "SM",   sm: "0.125rem", md: "0.25rem",  lg: "0.375rem", xl: "0.5rem" },
  { name: "MD",   sm: "0.25rem",  md: "0.375rem", lg: "0.5rem",  xl: "0.75rem" },
  { name: "LG",   sm: "0.5rem",   md: "0.75rem",  lg: "1rem",    xl: "1.5rem" },
  { name: "Full", sm: "9999px",   md: "9999px",   lg: "9999px",  xl: "9999px" },
];

const FONTS: FontPreset[] = [
  { name: "system", label: "System", value: "system-ui, sans-serif" },
  { name: "inter",  label: "Inter",  value: "'Inter', system-ui, sans-serif" },
  { name: "geist",  label: "Geist",  value: "'Geist', system-ui, sans-serif" },
  { name: "mono",   label: "Mono",   value: "ui-monospace, monospace" },
];

// ─── Token generation ────────────────────────────────────────────────────────

function buildTokens(
  accent: AccentPreset,
  base: BasePreset,
  radius: RadiusPreset,
  font: FontPreset,
) {
  const ah = accent.hue;
  const ac = accent.chroma;
  const bh = base.hue;
  const bc = base.chroma;

  // oklch shorthand helpers
  const ok = (l: number, c: number, h: number) =>
    c === 0 ? `oklch(${l}% 0 0)` : `oklch(${l}% ${c} ${h})`;

  const light: Record<string, string> = {
    background:              ok(100, 0,   0),
    foreground:              ok(9,   0,   0),
    card:                    ok(100, 0,   0),
    "card-foreground":       ok(9,   0,   0),
    popover:                 ok(100, 0,   0),
    "popover-foreground":    ok(9,   0,   0),
    primary:                 ok(55,  ac,  ah),
    "primary-foreground":    ok(98,  0,   0),
    secondary:               ok(96,  bc,  bh),
    "secondary-foreground":  ok(9,   0,   0),
    accent:                  ok(93,  bc,  bh),
    "accent-foreground":     ok(9,   0,   0),
    muted:                   ok(93,  bc,  bh),
    "muted-foreground":      ok(42,  0,   0),
    destructive:             ok(55,  0.22, 25),
    "destructive-foreground": ok(98, 0,   0),
    border:                  ok(70,  bc,  bh),
    input:                   ok(70,  bc,  bh),
    ring:                    ok(55,  ac,  ah),
  };

  const dark: Record<string, string> = {
    background:              ok(9,   0,   0),
    foreground:              ok(98,  0,   0),
    card:                    ok(11,  0,   0),
    "card-foreground":       ok(98,  0,   0),
    popover:                 ok(11,  0,   0),
    "popover-foreground":    ok(98,  0,   0),
    primary:                 ok(65,  ac,  ah),
    "primary-foreground":    ok(9,   0,   0),
    secondary:               ok(14,  bc,  bh),
    "secondary-foreground":  ok(98,  0,   0),
    accent:                  ok(18,  bc,  bh),
    "accent-foreground":     ok(98,  0,   0),
    muted:                   ok(14,  bc,  bh),
    "muted-foreground":      ok(60,  0,   0),
    destructive:             ok(60,  0.22, 25),
    "destructive-foreground": ok(98, 0,   0),
    border:                  ok(40,  bc,  bh),
    input:                   ok(40,  bc,  bh),
    ring:                    ok(65,  ac,  ah),
  };

  const shared: Record<string, string> = {
    "radius-sm":             radius.sm,
    "radius-md":             radius.md,
    "radius-lg":             radius.lg,
    "radius-xl":             radius.xl,
    "radius-full":           "9999px",
    "font-sans":             font.value,
    "font-mono":             "ui-monospace, monospace",
    "text-xs":               "0.75rem",
    "text-sm":               "0.875rem",
    "text-base":             "1rem",
    "text-lg":               "1.125rem",
    "font-weight-normal":    "400",
    "font-weight-medium":    "500",
    "font-weight-semibold":  "600",
    "font-weight-bold":      "700",
    "button-padding-sm":     "0.375rem 0.75rem",
    "button-padding-md":     "0.5rem 1rem",
    "button-padding-lg":     "0.625rem 1.25rem",
    "shadow-sm":             "0 1px 2px 0 oklch(0% 0 0 / 0.05)",
    "shadow-md":             "0 4px 6px -1px oklch(0% 0 0 / 0.1), 0 2px 4px -2px oklch(0% 0 0 / 0.1)",
    "shadow-lg":             "0 10px 15px -3px oklch(0% 0 0 / 0.1), 0 4px 6px -4px oklch(0% 0 0 / 0.1)",
  };

  return { light, dark, shared };
}

// Merges tokens into React inline style (CSS custom properties cascade/inherit)
function varsStyle(tokens: Record<string, string>): React.CSSProperties {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(tokens)) out[`--bambi-${k}`] = v;
  return out as React.CSSProperties;
}

// ─── Token table groups ───────────────────────────────────────────────────────

const TOKEN_GROUPS = [
  { label: "Base",    keys: ["background", "foreground"] },
  { label: "Surface", keys: ["card", "card-foreground", "popover", "popover-foreground"] },
  {
    label: "Brand",
    keys: ["primary", "primary-foreground", "secondary", "secondary-foreground", "accent", "accent-foreground"],
  },
  { label: "State",   keys: ["muted", "muted-foreground", "destructive", "destructive-foreground"] },
  { label: "Utility", keys: ["border", "input", "ring"] },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ThemeBuilder() {
  const [accent, setAccent] = useState<AccentPreset>(ACCENTS[0]!);
  const [base,   setBase]   = useState<BasePreset>(BASES[0]!);
  const [radius, setRadius] = useState<RadiusPreset>(RADII[2]!);
  const [font,   setFont]   = useState<FontPreset>(FONTS[0]!);
  const [showTokens, setShowTokens] = useState(false);
  const [copied, setCopied] = useState(false);

  const tokens = useMemo(
    () => buildTokens(accent, base, radius, font),
    [accent, base, radius, font],
  );

  // Apply current-mode tokens to documentElement for global live preview
  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    const colorTokens = isDark ? tokens.dark : tokens.light;
    for (const [k, v] of Object.entries({ ...colorTokens, ...tokens.shared })) {
      root.style.setProperty(`--bambi-${k}`, v);
    }
  }, [tokens]);

  // Inject dark override style tag
  useEffect(() => {
    let tag = document.getElementById("bambi-dark-preview") as HTMLStyleElement | null;
    if (!tag) {
      tag = document.createElement("style");
      tag.id = "bambi-dark-preview";
      document.head.appendChild(tag);
    }
    const rules = Object.entries(tokens.dark).map(([k, v]) => `  --bambi-${k}: ${v};`).join("\n");
    tag.textContent = `.dark {\n${rules}\n}`;
  }, [tokens.dark]);

  // Remove all overrides on unmount
  useEffect(() => {
    return () => {
      const base0 = buildTokens(ACCENTS[0]!, BASES[0]!, RADII[2]!, FONTS[0]!);
      const allKeys = [...Object.keys(base0.light), ...Object.keys(base0.shared)];
      const root = document.documentElement;
      allKeys.forEach((k) => root.style.removeProperty(`--bambi-${k}`));
      document.getElementById("bambi-dark-preview")?.remove();
    };
  }, []);

  const generateCSS = useCallback(() => {
    const lightLines = Object.entries({ ...tokens.light, ...tokens.shared })
      .map(([k, v]) => `  --bambi-${k}: ${v};`)
      .join("\n");
    const darkLines = Object.entries(tokens.dark)
      .map(([k, v]) => `  --bambi-${k}: ${v};`)
      .join("\n");
    return `/* paste after @import "@bambi-ui/theme/tokens.css" in your global.css */\n:root {\n${lightLines}\n}\n\n.dark {\n${darkLines}\n}`;
  }, [tokens]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateCSS()).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setAccent(ACCENTS[0]!);
    setBase(BASES[0]!);
    setRadius(RADII[2]!);
    setFont(FONTS[0]!);
  };

  return (
    <div className="space-y-10">

      {/* ── Controls ──────────────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-border bg-card p-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Accent */}
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Accent
            </p>
            <div className="flex flex-wrap gap-2">
              {ACCENTS.map((a) => (
                <button
                  key={a.name}
                  title={a.name}
                  aria-label={a.name}
                  aria-pressed={accent.name === a.name}
                  onClick={() => setAccent(a)}
                  className={cn(
                    "h-7 w-7 rounded-full border-2 transition-transform",
                    accent.name === a.name
                      ? "scale-110 border-foreground"
                      : "border-transparent hover:scale-105 hover:border-border",
                  )}
                  style={{ backgroundColor: `oklch(55% ${a.chroma} ${a.hue})` }}
                />
              ))}
            </div>
          </div>

          {/* Base */}
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Base
            </p>
            <div className="flex gap-2">
              {BASES.map((b) => (
                <button
                  key={b.name}
                  onClick={() => setBase(b)}
                  className={cn(
                    "flex-1 rounded-md border py-2 text-xs font-medium transition-colors",
                    base.name === b.name
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Radius */}
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Radius
            </p>
            <div className="flex gap-1.5">
              {RADII.map((r) => (
                <button
                  key={r.name}
                  onClick={() => setRadius(r)}
                  title={`${r.md} base`}
                  className={cn(
                    "flex-1 border py-2 text-xs font-medium transition-colors",
                    radius.name === r.name
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                  style={{
                    borderRadius:
                      r.name === "None" ? "0"
                      : r.name === "Full" ? "9999px"
                      : r.md,
                  }}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          {/* Font */}
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Font Family
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {FONTS.map((f) => (
                <button
                  key={f.name}
                  onClick={() => setFont(f)}
                  className={cn(
                    "rounded-md border py-2 text-xs font-medium transition-colors",
                    font.name === f.name
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                  style={{ fontFamily: f.value }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Live Preview ──────────────────────────────────────────────────────── */}
      <section>
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Preview
        </p>
        <div className="grid grid-cols-2 gap-4">
          {(
            [
              { label: "Light", t: tokens.light },
              { label: "Dark",  t: tokens.dark },
            ] as const
          ).map(({ label, t }) => (
            <div
              key={label}
              className="rounded-xl border p-6"
              style={
                {
                  ...varsStyle({ ...t, ...tokens.shared }),
                  backgroundColor: t.background,
                  borderColor: t.border,
                  fontFamily: font.value,
                } as React.CSSProperties
              }
            >
              <p
                className="mb-5 text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: t["muted-foreground"] }}
              >
                {label}
              </p>

              {/* Buttons */}
              <div className="mb-5 flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              {/* Card */}
              <div
                className="mb-4 border p-4"
                style={{
                  backgroundColor: t.card,
                  borderColor: t.border,
                  borderRadius: tokens.shared["radius-lg"],
                }}
              >
                <p
                  className="mb-1 text-sm font-semibold"
                  style={{ color: t["card-foreground"] }}
                >
                  Card Title
                </p>
                <p className="text-xs" style={{ color: t["muted-foreground"] }}>
                  Muted description text inside a card.
                </p>
              </div>

              {/* Input */}
              <div
                className="border px-3 py-2 text-xs"
                style={{
                  backgroundColor: t.background,
                  borderColor: t.input,
                  color: t.foreground,
                  borderRadius: tokens.shared["radius-md"],
                }}
              >
                Input field placeholder
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Token Table ───────────────────────────────────────────────────────── */}
      <section>
        <button
          onClick={() => setShowTokens((v) => !v)}
          className="mb-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <span
            className="inline-block transition-transform duration-150"
            style={{ transform: showTokens ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            ▶
          </span>
          Generated Tokens
        </button>

        {showTokens && (
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">Token</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">☀️ Light</th>
                  <th className="px-4 py-2.5 text-left font-medium text-muted-foreground">🌙 Dark</th>
                </tr>
              </thead>
              <tbody>
                {TOKEN_GROUPS.map((group) => (
                  <>
                    <tr key={`group-${group.label}`}>
                      <td
                        colSpan={3}
                        className="border-t border-border bg-muted/50 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
                      >
                        {group.label}
                      </td>
                    </tr>
                    {group.keys.map((key) => (
                      <tr
                        key={key}
                        className="border-t border-border/40 hover:bg-muted/30"
                      >
                        <td className="px-4 py-2 font-mono text-foreground">
                          --bambi-{key}
                        </td>
                        <td className="px-4 py-2">
                          <span className="flex items-center gap-2">
                            <span
                              className="inline-block h-3.5 w-3.5 shrink-0 rounded border border-black/10"
                              style={{ backgroundColor: (tokens.light as Record<string, string>)[key] }}
                            />
                            <span className="font-mono text-muted-foreground">
                              {(tokens.light as Record<string, string>)[key]}
                            </span>
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <span className="flex items-center gap-2">
                            <span
                              className="inline-block h-3.5 w-3.5 shrink-0 rounded border border-white/10"
                              style={{ backgroundColor: (tokens.dark as Record<string, string>)[key] }}
                            />
                            <span className="font-mono text-muted-foreground">
                              {(tokens.dark as Record<string, string>)[key]}
                            </span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Export CSS ────────────────────────────────────────────────────────── */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
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
        <pre className="overflow-x-auto rounded-xl border border-border bg-muted px-5 py-4 font-mono text-xs leading-relaxed text-foreground">
          {generateCSS()}
        </pre>
      </section>
    </div>
  );
}
