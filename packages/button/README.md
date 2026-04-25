# @bambi-ui/button

Accessible, themeable button component for React.

## Installation

```sh
pnpm add @bambi-ui/button
```

Import the design tokens in your global CSS before using the component:

```css
@import "@bambi-ui/theme/tokens.css";
```

## Usage

```tsx
import { Button } from "@bambi-ui/button";

<Button>Click me</Button>
<Button variant="secondary" size="lg">Secondary</Button>
<Button variant="destructive" disabled>Delete</Button>
```

## Props

Extends all native `<button>` HTML attributes.

| Prop        | Type                                               | Default     |
|-------------|----------------------------------------------------|-------------|
| `variant`   | `"primary" \| "secondary" \| "ghost" \| "destructive"` | `"primary"` |
| `size`      | `"sm" \| "md" \| "lg"`                            | `"md"`      |
| `disabled`  | `boolean`                                          | `false`     |
| `ref`       | `Ref<HTMLButtonElement>`                           | —           |

## Accessibility

- Renders a native `<button>` element — keyboard and screen reader support is built in.
- Focus ring is only visible during keyboard navigation (`data-focus-visible`). Mouse clicks do not trigger the ring.
- `disabled` sets `aria-disabled` implicitly via the native attribute and removes the element from tab order.

## Theming

All visual properties reference `--bambi-*` CSS custom properties. Override them in your `global.css`:

```css
@import "@bambi-ui/theme/tokens.css";

:root {
  --bambi-primary: oklch(60% 0.25 30);
  --bambi-button-padding-md: 0.6rem 1.25rem;
}
```

| Token                        | Used for                  |
|------------------------------|---------------------------|
| `--bambi-primary`            | Primary background        |
| `--bambi-primary-foreground` | Primary text              |
| `--bambi-secondary`          | Secondary background      |
| `--bambi-destructive`        | Destructive background    |
| `--bambi-accent`             | Ghost hover background    |
| `--bambi-ring`               | Focus ring color          |
| `--bambi-radius-sm/md`       | Border radius by size     |
| `--bambi-text-xs/sm/base`    | Font size by size         |
| `--bambi-font-weight-medium` | Button font weight        |
| `--bambi-button-padding-*`   | Padding by size           |
