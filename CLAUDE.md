# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands are run from the repo root using `pnpm`.

```sh
# Development (all apps)
pnpm dev

# Development (single app)
pnpm turbo dev --filter=web      # port 3000
pnpm turbo dev --filter=docs     # port 3001

# Build
pnpm build
pnpm turbo build --filter=web    # single app

# Lint
pnpm lint

# Type check
pnpm check-types

# Format
pnpm format

# Add a new UI component (uses turbo gen)
pnpm --filter=@repo/ui generate:component
```

There are no tests configured yet.

## Architecture

This is a **pnpm + Turborepo monorepo** with two layers:

### Apps (`apps/`)
- **`web`** — Next.js 16 app on port 3000
- **`docs`** — Next.js 16 app on port 3001

Both apps consume `@repo/ui` and share the same ESLint/TypeScript configs.

### Packages (`packages/`)
- **`@repo/ui`** — Shared React component library. Components are exported directly as `.tsx` source files (no build step) via the `exports` field: `"./*": "./src/*.tsx"`. Adding a new component means adding a file to `packages/ui/src/`.
- **`@repo/eslint-config`** — Three ESLint presets: `base`, `next-js`, `react-internal`.
- **`@repo/typescript-config`** — Three tsconfig presets: `base.json`, `nextjs.json`, `react-library.json`.

### Key conventions
- Package manager: **pnpm** (v9). Never use `npm` or `yarn`.
- `@repo/ui` ships source directly — no compilation, no `dist/`. Apps import TSX files from the package at build time.
- All `"use client"` directives belong in `@repo/ui` components, not in the app code.
- Turbo task graph: `build` and `check-types` depend on `^build`/`^check-types` (packages build before apps). `dev` is persistent with no cache.
- TypeScript strict mode is on (`strict: true`, `noUncheckedIndexedAccess: true`) across all packages.
