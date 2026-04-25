# bambi-ui

`bambi-ui` is an accessibility-first React UI component library built on web standards. Every component targets WCAG 2.2 AA compliance, uses semantic HTML, and ships keyboard and screen-reader support out of the box.

The repository is a pnpm + Turborepo monorepo that publishes independent packages under the `@bambi-ui` scope.

## Philosophy

- **Accessibility first** — components meet WCAG 2.2 AA. ARIA roles, labels, and live regions are built in, not bolted on.
- **Web standards** — semantic HTML elements are used where possible; custom widgets follow the [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) patterns.
- **Keyboard navigable** — every interactive component is fully operable by keyboard.
- **Screen reader friendly** — components are designed and tested against VoiceOver and NVDA.
- **Progressive enhancement** — base functionality works without JavaScript where applicable.
- **Zero unnecessary JavaScript** — CSS handles visual states (hover, focus, transitions, layout). JavaScript is only added when native HTML and CSS genuinely cannot solve the problem. Every byte of JS in a package must justify its existence.

## What is in this repository

- `apps/docs`: Astro-based documentation and live component previews
- `apps/playground`: Next.js playground app for quick experiments
- `packages/*`: publishable component and utility packages

Current package scope includes:

- `@bambi-ui/a11y` — accessibility primitives (`useFocusTrap`, `useFocusRing`, `usePress`, `announce`, and more)
- `@bambi-ui/button` — accessible Button component
- `@bambi-ui/card` — semantic Card component
- `@bambi-ui/code` — inline code component
- `@bambi-ui/color-picker` — accessible color picker
- `@bambi-ui/theme` — design tokens and theming utilities

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
