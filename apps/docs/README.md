# bambi-ui docs

This app is the documentation and live preview site for the `@bambi-ui/*` component packages.

- Production URL: `https://bambi-ui.felekoglu.dev`

## What this app contains

- Component docs pages under `src/pages/components/<name>/index.astro`
- Package-level docs pages under `src/pages/packages/`
- Theme Builder page under `src/pages/theme/index.astro`
- Docs-only React helpers in `src/components/`

## Local development

Run commands from the monorepo root.

| Command                          | Action                                 |
| :------------------------------- | :------------------------------------- |
| `pnpm install`                   | Install dependencies                   |
| `pnpm turbo dev --filter=docs`   | Start docs app in dev mode (port 3000) |
| `pnpm turbo build --filter=docs` | Build only docs app                    |
| `pnpm check-types`               | Run workspace type checks              |
| `pnpm lint`                      | Run workspace lint tasks               |

## Package publishing and npm scope

- npm scope: `@bambi-ui`
- package management page: `https://www.npmjs.com/settings/bambi-ui/packages`
- public organization page: `https://www.npmjs.com/org/bambi-ui`

Publishing is handled in CI via `.github/workflows/publish-packages.yml` and `.github/scripts/publish-packages.mjs`.

## Notes for adding a new component package

1. Create a package under `packages/<name>/` with `package.json`, `tsconfig.json`, and `src/index.tsx`.
2. Add a docs page at `apps/docs/src/pages/components/<name>/index.astro`.
3. Build and type-check from the repo root before publishing.
