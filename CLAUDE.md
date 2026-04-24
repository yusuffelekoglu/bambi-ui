# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands are run from the repo root using `pnpm`.

```sh
# Development
pnpm dev
pnpm turbo dev --filter=docs     # port 3000

# Build
pnpm build
pnpm turbo build --filter=docs   # single app

# Lint
pnpm lint

# Type check
pnpm check-types

# Format
pnpm format

# Add a new UI package (manual)
# Create packages/<name>/ with package.json, tsconfig.json, src/index.tsx
```

There are no tests configured yet.

## Architecture

This is a **pnpm + Turborepo monorepo** with two layers:

### Apps (`apps/`)
- **`docs`** — Astro app on port 3000. Serves as the documentation and live preview site for `@bambi-ui/*` packages.
  - Component pages live under `src/pages/components/<name>/index.astro`.
  - The Theme Builder lives at `src/pages/theme/index.astro` and uses `src/components/ThemeBuilder.tsx`.
  - Docs-only React components (not exported from packages) live in `src/components/`.

### Packages (`packages/`)
- **`@bambi-ui/button`** — Button component package.
- **`@bambi-ui/card`** — Card component package.
- **`@bambi-ui/code`** — Inline code component package.
- **`@bambi-ui/color-picker`** — Color picker component package.
- **`@bambi-ui/theme`** — Shared theming assets (`tokens.css`) and utilities (`cn`).

### Key conventions
- Package manager: **pnpm** (v9). Never use `npm` or `yarn`.
- Shared package scope is **`@bambi-ui`**.
- ESLint and TypeScript configs are managed per app/package (no shared config workspace packages).
- Import each component from its own package (for example: `@bambi-ui/button`).
- Import design tokens from `@bambi-ui/theme/tokens.css`.
- Adding a new component: create a dedicated package at `packages/<name>/` with local `package.json`, `tsconfig.json`, and `src/index.tsx`. Add a corresponding page at `apps/docs/src/pages/components/<name>/index.astro`.
- In `apps/docs`, component pages must use directory-based routing (`<name>/index.astro`) rather than flat files (`<name>.astro`) to avoid TypeScript conflicts with the component import names.
- All `"use client"` directives belong in component packages as needed. In Astro, React components need `client:load` (or another client directive) to be interactive.
- Turbo task graph: `build` and `check-types` depend on `^build`/`^check-types` (packages build before apps). `dev` is persistent with no cache.
- TypeScript strict mode is on (`strict: true`, `noUncheckedIndexedAccess: true`) across all packages.

## Design tokens (`packages/theme/src/tokens.css`)

All tokens are defined as `--bambi-*` CSS custom properties and exposed to Tailwind v4 via `@theme inline`. The full token set:

| Group        | Tokens                                                                                  |
|--------------|-----------------------------------------------------------------------------------------|
| Base         | `background`, `foreground`                                                              |
| Surface      | `card`, `card-foreground`, `popover`, `popover-foreground`                              |
| Brand        | `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `accent`, `accent-foreground` |
| State        | `muted`, `muted-foreground`, `destructive`, `destructive-foreground`                    |
| Utility      | `border`, `input`, `ring`                                                               |
| Border Radius| `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`, `radius-full`                      |
| Typography   | `font-sans`, `font-mono`                                                                |
| Shadows      | `shadow-sm`, `shadow-md`, `shadow-lg`                                                   |

**Override pattern** — paste into your `global.css` after `@import "@bambi-ui/theme/tokens.css"`:

```css
:root {
  --bambi-primary: oklch(60% 0.25 30);
}
.dark {
  --bambi-primary: oklch(70% 0.25 30);
}
```

Use the **Theme Builder** at `/theme` to generate this snippet interactively.

## Theme Builder (`apps/docs/src/pages/theme/`)

- Interactive React component (`ThemeBuilder.tsx`) that renders with `client:load`.
- Edits light tokens via `document.documentElement.style.setProperty("--bambi-*", ...)`.
- Edits dark tokens via an injected `<style id="bambi-dark-preview">` tag.
- Reverts all overrides on unmount (navigation away).
- Exports a ready-to-paste CSS snippet with `:root` and `.dark` blocks.

## Layout

`apps/docs/src/layouts/Layout.astro` accepts a `wide` boolean prop (default `false`).
Wide pages remove the `max-w-3xl` constraint on `<main>` — use for pages that need a full-width grid (e.g. Theme Builder).
