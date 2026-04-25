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
  - Production URL: `https://bambi-ui.felekoglu.dev`
  - Component pages live under `src/pages/components/<name>/index.astro`.
  - The Theme Builder lives at `src/pages/theme/index.astro` and uses `src/components/ThemeBuilder.tsx`.
  - Docs-only React components (not exported from packages) live in `src/components/`.

### Packages (`packages/`)

- **`@bambi-ui/a11y`** — Accessibility primitives used internally and available to consumers: `useFocusTrap`, `useFocusRing`, `usePress`, `useId`, `useControllableState`, `composeRefs`/`useComposeRefs`, `announce`.
- **`@bambi-ui/button`** — Accessible Button component.
- **`@bambi-ui/card`** — Semantic Card component.
- **`@bambi-ui/code`** — Inline code component.
- **`@bambi-ui/color-picker`** — Accessible color picker component.
- **`@bambi-ui/theme`** — Shared theming assets (`tokens.css`) and utilities (`cn`).

### Key conventions

- Package manager: **pnpm** (v9). Never use `npm` or `yarn`.
- Shared package scope is **`@bambi-ui`**.
- npm package management page: `https://www.npmjs.com/settings/bambi-ui/packages`
- npm public organization page: `https://www.npmjs.com/org/bambi-ui`
- ESLint and TypeScript configs are managed per app/package (no shared config workspace packages).
- Import each component from its own package (for example: `@bambi-ui/button`).
- Import design tokens from `@bambi-ui/theme/tokens.css`.
- Adding a new component: create a dedicated package at `packages/<name>/` with local `package.json`, `tsconfig.json`, and `src/index.tsx`. Add a corresponding page at `apps/docs/src/pages/components/<name>/index.astro`.
- In `apps/docs`, component pages must use directory-based routing (`<name>/index.astro`) rather than flat files (`<name>.astro`) to avoid TypeScript conflicts with the component import names.
- All `"use client"` directives belong in component packages as needed. In Astro, React components need `client:load` (or another client directive) to be interactive.
- Turbo task graph: `build` and `check-types` depend on `^build`/`^check-types` (packages build before apps). `dev` is persistent with no cache.
- TypeScript strict mode is on (`strict: true`, `noUncheckedIndexedAccess: true`) across all packages.

## Accessibility & Web Standards

All `@bambi-ui` components must meet **WCAG 2.2 AA**. Follow these rules when building or modifying components.

### Semantic HTML

- Use the correct native element (`<button>`, `<a>`, `<input>`, etc.) before reaching for a `<div>` with ARIA.
- Headings must follow a logical hierarchy — never skip levels.

### ARIA

- Follow [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) patterns for complex widgets (dialogs, menus, tabs, comboboxes).
- Only add `role` and `aria-*` attributes when native semantics are insufficient.
- Every interactive element must have an accessible name (visible label, `aria-label`, or `aria-labelledby`).

### Keyboard Navigation

- All interactive components must be fully operable by keyboard.
- Focus order must be logical and predictable.
- Visible focus indicators are required — never `outline: none` without a custom replacement. Use `useFocusRing` from `@bambi-ui/a11y` to show focus rings only on keyboard navigation.
- Use `useFocusTrap` from `@bambi-ui/a11y` for modal-like components that need to constrain focus.

### Screen Readers

- Use `announce` from `@bambi-ui/a11y` for dynamic status messages (wraps double-buffered `aria-live` regions).
- Use `usePress` from `@bambi-ui/a11y` to make non-button elements keyboard-accessible (`Enter`/`Space` activation, `aria-disabled`).

### Color & Contrast

- Text contrast ratio ≥ 4.5:1 (normal text) and ≥ 3:1 (large text) against background.
- Never convey information through color alone — pair with text, icons, or patterns.

### Zero Unnecessary JavaScript

Packages must stay as lean as possible. Apply this hierarchy when implementing any behavior:

1. **Native HTML** — use the element or attribute that provides the behavior for free (`<details>`, `<dialog>`, `required`, `disabled`, `type="checkbox"`, etc.).
2. **CSS** — handle visual states, transitions, layout, and interactivity with CSS (`:hover`, `:focus-visible`, `:checked`, `@starting-style`, `transition`, `animation`, `popover` + `:popover-open`).
3. **JavaScript** — only add JS when HTML and CSS genuinely cannot solve the problem (complex focus management, live announcements, controllable state).

**Rules:**
- Never use a JS event listener to set a visual style that `:hover`, `:focus`, `:active`, or `:checked` can express natively.
- Never replicate browser-native behavior in JS (form validation, checkbox toggle, link navigation).
- Avoid runtime class toggling for styles that CSS pseudo-classes can handle.
- Animations and transitions belong in CSS — not `requestAnimationFrame` loops or JS-driven style mutations.
- If a utility hook in `@bambi-ui/a11y` is not used in a component, do not import it — tree-shaking is not a license to import freely.
- Benchmark bundle size when adding new JS to a package. A new component should add < 1 kB of JS (gzipped) unless there is a clear accessibility justification.

### New component checklist

- [ ] Uses a semantic HTML element
- [ ] Has an accessible name
- [ ] Keyboard operable (Tab, Enter/Space, arrow keys where applicable)
- [ ] Focus indicator visible on keyboard navigation
- [ ] ARIA roles/attributes follow the APG pattern (if applicable)
- [ ] Uses `@bambi-ui/a11y` primitives only when native HTML and CSS cannot solve the problem
- [ ] No JS used for styles expressible via CSS pseudo-classes
- [ ] No new JS added without an accessibility or functionality justification

## Publishing

- GitHub Actions publish workflow: `.github/workflows/publish-packages.yml`
- Publish/build helper script: `.github/scripts/publish-packages.mjs`
- Workflow discovers and processes all publishable packages under `packages/*`.
- For CI publishing, use an npm **Automation token** in the `NPM_TOKEN` secret to avoid interactive OTP prompts.

## Design tokens (`packages/theme/src/tokens.css`)

All tokens are defined as `--bambi-*` CSS custom properties and exposed to Tailwind v4 via `@theme inline`. The full token set:

| Group         | Tokens                                                                                              |
| ------------- | --------------------------------------------------------------------------------------------------- |
| Base          | `background`, `foreground`                                                                          |
| Surface       | `card`, `card-foreground`, `popover`, `popover-foreground`                                          |
| Brand         | `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `accent`, `accent-foreground` |
| State         | `muted`, `muted-foreground`, `destructive`, `destructive-foreground`, `success`, `success-foreground`, `warning`, `warning-foreground` |
| Utility       | `border`, `input`, `ring`                                                                           |
| Border Radius | `radius-sm`, `radius-md`, `radius-lg`, `radius-xl`, `radius-full`                                   |
| Typography    | `font-sans`, `font-mono`                                                                            |
| Shadows       | `shadow-sm`, `shadow-md`, `shadow-lg`                                                               |

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
