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

{/* Variants */}
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>

{/* Sizes */}
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Add">
  <svg .../>
</Button>

{/* With icon */}
<Button>
  <svg aria-hidden="true" .../>
  Save changes
</Button>
<Button>
  Continue
  <svg aria-hidden="true" .../>
</Button>

{/* Loading */}
<Button loading>Saving…</Button>
<Button variant="destructive" loading>Deleting…</Button>

{/* Disabled */}
<Button disabled>Unavailable</Button>
```

## Props

Extends all native `<button>` HTML attributes.

| Prop       | Type                                                                                                                   | Default     |
|------------|------------------------------------------------------------------------------------------------------------------------|-------------|
| `variant`  | `"primary" \| "secondary" \| "outline" \| "ghost" \| "link" \| "destructive" \| "success" \| "warning"` | `"primary"` |
| `size`     | `"sm" \| "md" \| "lg" \| "icon"`                                                                                     | `"md"`      |
| `loading`  | `boolean`                                                                                                              | `false`     |
| `disabled` | `boolean`                                                                                                              | `false`     |
| `ref`      | `Ref<HTMLButtonElement>`                                                                                               | —           |

## Icon buttons

The button is `inline-flex` with a `gap` token, so icons work as plain children alongside text. Mark decorative icons with `aria-hidden="true"`.

For icon-only buttons, use `size="icon"` and always provide an accessible name via `aria-label`:

```tsx
<Button size="icon" aria-label="Close dialog">
  <svg aria-hidden="true" .../>
</Button>
```

## Loading state

`loading` sets `aria-busy`, `aria-disabled`, and `pointer-events: none`. The spinner is rendered via CSS animation; the button text is visually hidden but preserved in the DOM to keep the button's width stable.

The button is **not** natively `disabled` when loading so it stays in the accessibility tree and screen readers can announce the busy state.

## Accessibility

- Renders a native `<button>` element — keyboard and screen reader support is built in.
- Focus ring is only visible during keyboard navigation (`:focus-visible`). Mouse clicks do not trigger the ring.
- `disabled` sets `aria-disabled` implicitly via the native attribute and removes the element from tab order.
- `loading` sets `aria-busy="true"` and `aria-disabled="true"` without removing the element from tab order.
- For `size="icon"` buttons, always provide an accessible name via `aria-label` or `aria-labelledby`.

## Theming

All button tokens are defined under `--bambi-button-*` in `@bambi-ui/theme/tokens.css` — the same file you already import. Each token defaults to the corresponding global theme token, so the button inherits your theme automatically. Override only what you need:

```css
@import "@bambi-ui/theme/tokens.css";

:root {
  /* override a button-specific token */
  --bambi-button-primary-bg: oklch(60% 0.25 30);
  --bambi-button-padding-md: 0.6rem 1.25rem;
  --bambi-button-spinner-duration: 0.4s;

  /* or override the global theme token to affect all components */
  --bambi-primary: oklch(60% 0.25 30);
}
```

### Token reference

#### Variant colors

| Token                                  | Default                        | Used for                       |
|----------------------------------------|--------------------------------|--------------------------------|
| `--bambi-button-primary-bg`            | `--bambi-primary`              | Primary background             |
| `--bambi-button-primary-foreground`    | `--bambi-primary-foreground`   | Primary text                   |
| `--bambi-button-secondary-bg`          | `--bambi-secondary`            | Secondary background           |
| `--bambi-button-secondary-foreground`  | `--bambi-secondary-foreground` | Secondary text                 |
| `--bambi-button-secondary-border`      | `--bambi-border`               | Secondary border               |
| `--bambi-button-ghost-color`           | `--bambi-foreground`           | Ghost text                     |
| `--bambi-button-ghost-hover-bg`        | `--bambi-accent`               | Ghost hover background         |
| `--bambi-button-ghost-hover-color`     | `--bambi-accent-foreground`    | Ghost hover text               |
| `--bambi-button-destructive-bg`        | `--bambi-destructive`          | Destructive background         |
| `--bambi-button-destructive-foreground`| `--bambi-destructive-foreground`| Destructive text              |
| `--bambi-button-outline-color`         | `--bambi-primary`              | Outline text                   |
| `--bambi-button-outline-border`        | `--bambi-primary`              | Outline border                 |
| `--bambi-button-outline-hover-bg`      | 10% primary tint               | Outline hover background       |
| `--bambi-button-link-color`            | `--bambi-primary`              | Link text                      |
| `--bambi-button-success-bg`            | `--bambi-success`              | Success background             |
| `--bambi-button-success-foreground`    | `--bambi-success-foreground`   | Success text                   |
| `--bambi-button-warning-bg`            | `--bambi-warning`              | Warning background             |
| `--bambi-button-warning-foreground`    | `--bambi-warning-foreground`   | Warning text                   |
| `--bambi-button-ring`                  | `--bambi-ring`                 | Focus ring color               |

#### Layout & typography

| Token                              | Default                      | Used for                          |
|------------------------------------|------------------------------|-----------------------------------|
| `--bambi-button-font-family`       | `--bambi-font-sans`          | Font family                       |
| `--bambi-button-font-size-sm`      | `--bambi-text-xs`            | Font size for `size="sm"`         |
| `--bambi-button-font-size-md`      | `--bambi-text-sm`            | Font size for `size="md"`         |
| `--bambi-button-font-size-lg`      | `--bambi-text-base`          | Font size for `size="lg"`         |
| `--bambi-button-font-weight`       | `--bambi-font-weight-medium` | Font weight                       |
| `--bambi-button-radius`            | `--bambi-radius-md`          | Border radius (default)           |
| `--bambi-button-radius-sm`         | `--bambi-radius-sm`          | Border radius for `size="sm"`     |
| `--bambi-button-gap`               | `0.375rem`                   | Gap between icon and label        |
| `--bambi-button-border-width`      | `1px`                        | Border width                      |
| `--bambi-button-line-height`       | `1`                          | Line height                       |
| `--bambi-button-padding-sm`        | `0.375rem 0.75rem`           | Padding for `size="sm"`           |
| `--bambi-button-padding-md`        | `0.5rem 1rem`                | Padding for `size="md"`           |
| `--bambi-button-padding-lg`        | `0.625rem 1.25rem`           | Padding for `size="lg"`           |
| `--bambi-button-padding-icon`      | `0.5rem`                     | Padding for `size="icon"`         |

#### States & animation

| Token                                 | Default                                          | Used for                          |
|---------------------------------------|--------------------------------------------------|-----------------------------------|
| `--bambi-button-transition`           | `opacity 0.15s ease, background-color 0.15s ease`| Hover/bg transition               |
| `--bambi-button-hover-opacity`        | `0.9`                                            | Hover opacity (filled variants)   |
| `--bambi-button-disabled-opacity`     | `0.5`                                            | Disabled opacity                  |
| `--bambi-button-focus-ring-width`     | `2px`                                            | Focus ring width                  |
| `--bambi-button-focus-ring-offset`    | `2px`                                            | Focus ring offset                 |
| `--bambi-button-link-underline-offset`| `4px`                                            | Link underline offset             |
| `--bambi-button-spinner-border-width` | `2px`                                            | Loading spinner border width      |
| `--bambi-button-spinner-duration`     | `0.6s`                                           | Loading spinner animation speed   |
