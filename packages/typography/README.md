# @bambi-ui/typography

Accessible, themeable typography components for React — `Heading` (h1–h6) and `Text` (body, lead, small, muted, label).

## Installation

```sh
pnpm add @bambi-ui/typography
```

Import the design tokens in your global CSS before using the components:

```css
@import "@bambi-ui/theme/tokens.css";
```

## Usage

```tsx
import { Heading, Text } from "@bambi-ui/typography";

<Heading level={1}>The quick brown fox</Heading>
<Heading level={2}>The quick brown fox</Heading>

<Text>Body text with comfortable line height.</Text>
<Text variant="lead">A larger introductory paragraph.</Text>
<Text variant="small">Fine print or secondary info.</Text>
<Text variant="muted">Subdued helper text.</Text>
<Text variant="label">UI label</Text>
```

## Heading

Renders the correct semantic heading element (`h1`–`h6`) based on `level`. Use the `as` prop to decouple visual style from document hierarchy — useful when the heading rank needed for accessibility differs from the visual size required by the design.

```tsx
{/* h2 in the DOM, styled as h1 */}
<Heading level={1} as="h2">Section title</Heading>
```

### Props

Extends all native heading HTML attributes.

| Prop        | Type                              | Default |
|-------------|-----------------------------------|---------|
| `level`     | `1 \| 2 \| 3 \| 4 \| 5 \| 6`    | `1`     |
| `as`        | `"h1" \| … \| "h6"`              | `h{level}` |
| `className` | `string`                          | —       |
| `ref`       | `Ref<HTMLHeadingElement>`         | —       |

## Text

Renders a text element with a semantic variant. The default element is `<p>`; use the `as` prop to change it.

```tsx
<Text variant="label" as="span">Required</Text>
<Text variant="muted" as="div">Last updated 3 days ago</Text>
```

### Props

Extends all native HTML element attributes.

| Prop        | Type                                                   | Default  |
|-------------|--------------------------------------------------------|----------|
| `variant`   | `"body" \| "lead" \| "small" \| "muted" \| "label"`   | `"body"` |
| `as`        | `"p" \| "span" \| "div" \| "label" \| "strong" \| "em" \| "small"` | `"p"` |
| `className` | `string`                                               | —        |
| `ref`       | `Ref<HTMLElement>`                                     | —        |

## Accessibility

- `Heading` always renders a native heading element — screen readers and document outline tools pick it up automatically.
- Heading hierarchy must be logical and must not skip levels. Use `as` to adjust the visual size independently of the semantic level.
- `Text` renders semantic HTML elements. Prefer `as="label"` only for non-form display labels; use the native `<label>` element with `htmlFor` for form labels.

## Theming

All typography tokens are defined under `--bambi-heading-*` and `--bambi-text-*` / `--bambi-typography-*` in `@bambi-ui/theme/tokens.css`. Override only what you need:

```css
@import "@bambi-ui/theme/tokens.css";

:root {
  --bambi-heading-weight: 700;
  --bambi-heading-1-size: 3rem;
  --bambi-text-lead-color: var(--bambi-foreground);
}
```

### Token reference

#### Heading tokens

| Token                        | Default                          | Used for               |
|------------------------------|----------------------------------|------------------------|
| `--bambi-heading-color`      | `--bambi-foreground`             | Text color             |
| `--bambi-heading-font-family`| `--bambi-font-sans`              | Font family            |
| `--bambi-heading-weight`     | `--bambi-font-weight-semibold`   | Font weight (h1–h5)    |
| `--bambi-heading-line-height`| `1.2`                            | Line height            |
| `--bambi-heading-1-size`     | `2.25rem`                        | h1 font size           |
| `--bambi-heading-2-size`     | `1.875rem`                       | h2 font size           |
| `--bambi-heading-3-size`     | `1.5rem`                         | h3 font size           |
| `--bambi-heading-4-size`     | `1.25rem`                        | h4 font size           |
| `--bambi-heading-5-size`     | `--bambi-text-lg`                | h5 font size           |
| `--bambi-heading-6-size`     | `--bambi-text-base`              | h6 font size           |
| `--bambi-heading-6-weight`   | `--bambi-font-weight-medium`     | Font weight (h6 only)  |

#### Text tokens

| Token                          | Default                        | Used for                   |
|--------------------------------|--------------------------------|----------------------------|
| `--bambi-typography-color`     | `--bambi-foreground`           | Default text color         |
| `--bambi-typography-font-family`| `--bambi-font-sans`           | Font family                |
| `--bambi-text-body-size`       | `--bambi-text-base`            | Body font size             |
| `--bambi-text-body-line-height`| `1.75`                         | Body line height           |
| `--bambi-text-lead-size`       | `--bambi-text-lg`              | Lead font size             |
| `--bambi-text-lead-color`      | `--bambi-muted-foreground`     | Lead text color            |
| `--bambi-text-lead-line-height`| `1.75`                         | Lead line height           |
| `--bambi-text-small-size`      | `--bambi-text-sm`              | Small font size            |
| `--bambi-text-small-weight`    | `--bambi-font-weight-medium`   | Small font weight          |
| `--bambi-text-muted-size`      | `--bambi-text-sm`              | Muted font size            |
| `--bambi-text-muted-color`     | `--bambi-muted-foreground`     | Muted text color           |
| `--bambi-text-label-size`      | `--bambi-text-sm`              | Label font size            |
| `--bambi-text-label-weight`    | `--bambi-font-weight-medium`   | Label font weight          |
