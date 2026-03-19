# bambi-ui

React component library built with Tailwind CSS v4, CVA, and Radix UI.

## Apps

| App | Description | URL |
|-----|-------------|-----|
| `apps/docs` | Astro documentation site | [bambi-ui.felekoglu.dev](https://bambi-ui.felekoglu.dev) |
| `apps/storybook` | Storybook component explorer | [storybook.bambi-ui.felekoglu.dev](https://storybook.bambi-ui.felekoglu.dev) |

## Packages

| Package | Description |
|---------|-------------|
| `@bambi-ui/core` | React component library (`packages/ui`) |
| `@repo/typescript-config` | Shared TypeScript configs |
| `@repo/eslint-config` | Shared ESLint configs |

## Stack

- **Turborepo** — monorepo build orchestration
- **pnpm workspaces** — package management
- **Tailwind CSS v4** — CSS-first design tokens via `@theme {}`
- **CVA** — component variant management
- **Radix UI** — accessible component primitives
- **Storybook 8** — component development environment
- **Astro 5** — documentation site
- **TypeScript 5.9** — strict mode throughout

## Getting started

```sh
pnpm install
```

### Development

```sh
# All apps in parallel
pnpm dev

# Specific app
pnpm --filter storybook dev   # → localhost:6006
pnpm --filter docs dev        # → localhost:4321
```

### Build

```sh
# All packages and apps
pnpm build

# Specific app (with dependencies)
pnpm build:docs
pnpm build:storybook
```

### Other

```sh
pnpm lint
pnpm check-types
pnpm format
```

## Using the library

Install the package:

```sh
npm install @bambi-ui/core
```

Import styles once in your app root:

```ts
import "@bambi-ui/core/styles";
```

Or, if using Tailwind v4, import the theme tokens into your CSS:

```css
@import "tailwindcss";
@import "@bambi-ui/core/tokens";
```

Use components:

```tsx
import { Button } from "@bambi-ui/core";

<Button variant="primary" size="md">Confirm Trade</Button>
<Button variant="danger" loading>Processing...</Button>
<Button asChild variant="outline"><a href="/portfolio">Portfolio</a></Button>
```

## Deploy

```sh
pnpm deploy:docs        # → bambiui.felekoglu.dev
pnpm deploy:storybook   # → storybook.bambiui.felekoglu.dev
```
