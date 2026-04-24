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

# Add a new UI component (uses turbo gen)
pnpm --filter=@bambi/ui generate:component
```

There are no tests configured yet.

## Architecture

This is a **pnpm + Turborepo monorepo** with two layers:

### Apps (`apps/`)
- **`docs`** — Astro app on port 3000. Serves as the documentation and live preview site for `@bambi/ui`. Each component has its own page under `src/pages/components/<name>/index.astro`.

### Packages (`packages/`)
- **`@bambi/ui`** — Shared React component library. Each component lives in its own folder under `src/<name>/index.tsx` with a `README.md`. All components are re-exported from `src/index.ts`, so consumers import from `@bambi/ui` directly. No build step — apps consume the TSX source files at build time.
- **`@bambi/eslint-config`** — Three ESLint presets: `base`, `next-js`, `react-internal`.
- **`@bambi/typescript-config`** — Three tsconfig presets: `base.json`, `nextjs.json`, `react-library.json`.

### Key conventions
- Package manager: **pnpm** (v9). Never use `npm` or `yarn`.
- All packages use the `@bambi` scope.
- Import all UI components from `@bambi/ui`, not from deep paths like `@bambi/ui/button`.
- Adding a new component: create `packages/ui/src/<name>/index.tsx` and `README.md`, then export it from `packages/ui/src/index.ts`. Add a corresponding page at `apps/docs/src/pages/components/<name>/index.astro`.
- In `apps/docs`, component pages must use directory-based routing (`<name>/index.astro`) rather than flat files (`<name>.astro`) to avoid TypeScript conflicts with the component import names.
- All `"use client"` directives belong in `@bambi/ui` components. In Astro, React components need `client:load` (or another client directive) to be interactive.
- Turbo task graph: `build` and `check-types` depend on `^build`/`^check-types` (packages build before apps). `dev` is persistent with no cache.
- TypeScript strict mode is on (`strict: true`, `noUncheckedIndexedAccess: true`) across all packages.
