# @bambi-ui/theme

Design tokens and utilities shared across all `@bambi-ui` packages.

## Installation

```sh
pnpm add @bambi-ui/theme
```

## Usage

### CSS tokens

Import once in your global stylesheet:

```css
@import "@bambi-ui/theme/tokens.css";
```

All tokens are exposed as `--bambi-*` CSS custom properties and are automatically available to Tailwind v4 via `@theme inline`.

### `cn(...inputs)`

A `clsx` + `tailwind-merge` utility for composing class names:

```ts
import { cn } from "@bambi-ui/theme";

cn("base-class", condition && "conditional", className);
```

## Token reference

### Colors

| Token                          | Light                        | Dark                         |
|--------------------------------|------------------------------|------------------------------|
| `--bambi-background`           | `oklch(100% 0 0)`            | `oklch(9% 0 0)`              |
| `--bambi-foreground`           | `oklch(9% 0 0)`              | `oklch(98% 0 0)`             |
| `--bambi-primary`              | `oklch(55% 0.22 250)`        | `oklch(65% 0.22 250)`        |
| `--bambi-primary-foreground`   | `oklch(98% 0 0)`             | `oklch(9% 0 0)`              |
| `--bambi-secondary`            | `oklch(96% 0 0)`             | `oklch(14% 0 0)`             |
| `--bambi-secondary-foreground` | `oklch(9% 0 0)`              | `oklch(98% 0 0)`             |
| `--bambi-accent`               | `oklch(93% 0 0)`             | `oklch(18% 0 0)`             |
| `--bambi-accent-foreground`    | `oklch(9% 0 0)`              | `oklch(98% 0 0)`             |
| `--bambi-muted`                | `oklch(93% 0 0)`             | `oklch(14% 0 0)`             |
| `--bambi-muted-foreground`     | `oklch(45% 0 0)`             | `oklch(60% 0 0)`             |
| `--bambi-destructive`          | `oklch(55% 0.22 25)`         | `oklch(60% 0.22 25)`         |
| `--bambi-destructive-foreground` | `oklch(98% 0 0)`           | `oklch(98% 0 0)`             |
| `--bambi-border`               | `oklch(88% 0 0)`             | `oklch(22% 0 0)`             |
| `--bambi-input`                | `oklch(88% 0 0)`             | `oklch(22% 0 0)`             |
| `--bambi-ring`                 | `oklch(55% 0.22 250)`        | `oklch(65% 0.22 250)`        |

### Border radius

| Token                  | Value       |
|------------------------|-------------|
| `--bambi-radius-sm`    | `0.25rem`   |
| `--bambi-radius-md`    | `0.375rem`  |
| `--bambi-radius-lg`    | `0.5rem`    |
| `--bambi-radius-xl`    | `0.75rem`   |
| `--bambi-radius-full`  | `9999px`    |

### Typography

| Token                        | Value                          |
|------------------------------|--------------------------------|
| `--bambi-font-sans`          | `system-ui, sans-serif`        |
| `--bambi-font-mono`          | `ui-monospace, monospace`      |
| `--bambi-text-xs`            | `0.75rem`                      |
| `--bambi-text-sm`            | `0.875rem`                     |
| `--bambi-text-base`          | `1rem`                         |
| `--bambi-text-lg`            | `1.125rem`                     |
| `--bambi-font-weight-normal` | `400`                          |
| `--bambi-font-weight-medium` | `500`                          |
| `--bambi-font-weight-semibold` | `600`                        |
| `--bambi-font-weight-bold`   | `700`                          |

### Shadows

| Token               | Value                                                                 |
|---------------------|-----------------------------------------------------------------------|
| `--bambi-shadow-sm` | `0 1px 2px 0 oklch(0% 0 0 / 0.05)`                                  |
| `--bambi-shadow-md` | `0 4px 6px -1px oklch(0% 0 0 / 0.1), 0 2px 4px -2px …`             |
| `--bambi-shadow-lg` | `0 10px 15px -3px oklch(0% 0 0 / 0.1), 0 4px 6px -4px …`           |

### Component tokens

| Token                        | Default       | Description                        |
|------------------------------|---------------|------------------------------------|
| `--bambi-button-padding-sm`  | `0.375rem 0.75rem` | Button small size padding     |
| `--bambi-button-padding-md`  | `0.5rem 1rem`      | Button medium size padding    |
| `--bambi-button-padding-lg`  | `0.625rem 1.25rem` | Button large size padding     |

## Overriding tokens

Paste this into your `global.css` after the import:

```css
@import "@bambi-ui/theme/tokens.css";

:root {
  --bambi-primary: oklch(60% 0.25 30);
  --bambi-radius-md: 0.5rem;
}

.dark {
  --bambi-primary: oklch(70% 0.25 30);
}
```

Use the **Theme Builder** at `/theme` in the docs app to generate this snippet interactively.
