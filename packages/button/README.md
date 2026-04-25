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

All visual properties reference `--bambi-*` CSS custom properties. Override them in your `global.css`:

```css
@import "@bambi-ui/theme/tokens.css";

:root {
  --bambi-primary: oklch(60% 0.25 30);
  --bambi-button-padding-md: 0.6rem 1.25rem;
  --bambi-button-spinner-duration: 0.4s;
}
```

| Token                              | Used for                          |
|------------------------------------|-----------------------------------|
| `--bambi-primary`                  | Primary / outline / link color    |
| `--bambi-primary-foreground`       | Primary text                      |
| `--bambi-secondary`                | Secondary background              |
| `--bambi-destructive`              | Destructive background            |
| `--bambi-success`                  | Success background                |
| `--bambi-success-foreground`       | Success text                      |
| `--bambi-warning`                  | Warning background                |
| `--bambi-warning-foreground`       | Warning text                      |
| `--bambi-accent`                   | Ghost hover background            |
| `--bambi-ring`                     | Focus ring color                  |
| `--bambi-radius-sm/md`             | Border radius by size             |
| `--bambi-text-xs/sm/base`          | Font size by size                 |
| `--bambi-font-weight-medium`       | Button font weight                |
| `--bambi-button-gap`               | Gap between icon and label        |
| `--bambi-button-border-width`      | Border width                      |
| `--bambi-button-line-height`       | Line height                       |
| `--bambi-button-transition`        | Hover/bg transition               |
| `--bambi-button-hover-opacity`     | Hover opacity for filled variants |
| `--bambi-button-disabled-opacity`  | Disabled opacity                  |
| `--bambi-button-focus-ring-width`  | Focus ring width                  |
| `--bambi-button-focus-ring-offset` | Focus ring offset                 |
| `--bambi-button-link-underline-offset` | Link underline offset         |
| `--bambi-button-outline-hover-bg`  | Outline hover background          |
| `--bambi-button-spinner-border-width` | Loading spinner border width  |
| `--bambi-button-spinner-duration`  | Loading spinner animation speed   |
| `--bambi-button-padding-*`         | Padding by size (sm/md/lg/icon)   |
