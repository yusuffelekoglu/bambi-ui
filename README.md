# bambi-ui

`bambi-ui` is a pnpm + Turborepo monorepo for building and publishing reusable React UI packages under the `@bambi-ui` scope.

## What is in this repository

- `apps/docs`: Astro-based documentation and live component previews
- `apps/playground`: Next.js playground app for quick experiments
- `packages/*`: publishable component and utility packages

Current package scope includes:

- `@bambi-ui/a11y`
- `@bambi-ui/button`
- `@bambi-ui/card`
- `@bambi-ui/code`
- `@bambi-ui/color-picker`
- `@bambi-ui/theme`

## npm organization

- Package management: https://www.npmjs.com/settings/bambi-ui/packages
- Public organization: https://www.npmjs.com/org/bambi-ui

## Docs site

- Production docs: https://bambi-ui.felekoglu.dev

## Getting started

All commands are run from the repo root.

```sh
pnpm install
pnpm dev
```

## Common commands

```sh
# Build all apps and packages
pnpm build

# Run docs app only
pnpm turbo dev --filter=docs

# Lint workspace
pnpm lint

# Type-check workspace
pnpm check-types

# Format repository
pnpm format
```

## Publishing packages

Package publishing is automated via GitHub Actions:

- Workflow: `.github/workflows/publish-packages.yml`
- Script: `.github/scripts/publish-packages.mjs`

The publish script discovers publishable packages under `packages/*`, orders them by internal dependencies, then builds and publishes in the correct sequence.
