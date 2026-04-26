# @bambi-ui/card

Semantic link card component for bambi-ui — an accessible `<a>` surface with a title, description, and animated arrow.

## Installation

```sh
pnpm add @bambi-ui/card
```

Import design tokens once in your global CSS:

```css
@import "@bambi-ui/theme/tokens.css";
```

## Usage

```tsx
import { Card } from "@bambi-ui/card";

<Card title="Documentation" href="https://example.com">
  Learn how to get started with bambi-ui.
</Card>
```

## Props

| Prop        | Type              | Required | Description                                           |
|-------------|-------------------|----------|-------------------------------------------------------|
| `title`     | `string`          | Yes      | Heading text rendered inside the card                 |
| `href`      | `string`          | Yes      | URL the card links to (opens in a new tab)            |
| `children`  | `React.ReactNode` | Yes      | Description content rendered below the title          |
| `className` | `string`          | No       | Additional class names merged onto the root `<a>`     |

The card renders as a native `<a>` element with `target="_blank"` and `rel="noopener noreferrer"`.

## Accessibility

- Renders a native `<a>` — keyboard and screen reader support is built in.
- Focus ring is visible during keyboard navigation via `:focus-visible`.
- `title` is the accessible name of the link; keep it descriptive.

## Theming

All visual properties reference `--bambi-*` CSS custom properties. Override them in your `global.css`:

```css
@import "@bambi-ui/theme/tokens.css";

:root {
  --bambi-secondary: oklch(96% 0 0);
  --bambi-radius-lg: 0.75rem;
}
```

| Token                          | Used for                    |
|--------------------------------|-----------------------------|
| `--bambi-border`               | Card border color           |
| `--bambi-radius-lg`            | Card corner radius          |
| `--bambi-secondary`            | Card background             |
| `--bambi-secondary-foreground` | Card text color             |
| `--bambi-muted`                | Hover background            |
| `--bambi-muted-foreground`     | Description text color      |
| `--bambi-ring`                 | Focus ring color            |
