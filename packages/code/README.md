# @bambi-ui/code

Styled inline code component for bambi-ui — a thin wrapper around the native `<code>` element with token-driven styling.

## Installation

```sh
pnpm add @bambi-ui/code
```

Import design tokens once in your global CSS:

```css
@import "@bambi-ui/theme/tokens.css";
```

## Usage

```tsx
import { Code } from "@bambi-ui/code";

<p>
  Import tokens via <Code>@bambi-ui/theme/tokens.css</Code>.
</p>
```

## Props

| Prop        | Type              | Required | Description                                        |
|-------------|-------------------|----------|----------------------------------------------------|
| `children`  | `React.ReactNode` | Yes      | Content rendered inside the `<code>` element       |
| `className` | `string`          | No       | Additional class names merged onto the root element |

## Accessibility

Renders a native `<code>` element — screen readers announce it as computer code in most modes.

## Theming

All visual properties reference `--bambi-*` CSS custom properties. Override them in your `global.css`:

```css
@import "@bambi-ui/theme/tokens.css";

:root {
  --bambi-muted: oklch(93% 0 0);
  --bambi-font-mono: "Fira Code", ui-monospace, monospace;
}
```

| Token                | Used for             |
|----------------------|----------------------|
| `--bambi-muted`      | Background color     |
| `--bambi-foreground` | Text color           |
| `--bambi-radius-sm`  | Corner radius        |
| `--bambi-font-mono`  | Monospace font stack |
