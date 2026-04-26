# @bambi-ui/color-picker

Accessible color picker component for bambi-ui — a swatch that opens the native `<input type="color">` dialog, paired with a hex text input for precise entry.

## Installation

```sh
pnpm add @bambi-ui/color-picker
```

Import design tokens once in your global CSS:

```css
@import "@bambi-ui/theme/tokens.css";
```

## Usage

```tsx
import { useState } from "react";
import { ColorPicker } from "@bambi-ui/color-picker";

function MyForm() {
  const [color, setColor] = useState("#3b82f6");

  return <ColorPicker value={color} onChange={setColor} />;
}
```

## Props

| Prop        | Type                       | Required | Description                                             |
|-------------|----------------------------|----------|---------------------------------------------------------|
| `value`     | `string`                   | Yes      | Current color as a hex string (e.g. `"#3b82f6"`)        |
| `onChange`  | `(value: string) => void`  | Yes      | Called with the new hex value whenever the color changes |
| `className` | `string`                   | No       | Additional class names merged onto the root wrapper      |

The component is fully controlled — `value` must be a valid 6-digit hex string.

## Behavior

- **Swatch**: clicking or activating the swatch opens the browser's native color dialog.
- **Text input**: accepts free-form hex input. Changes are committed on every keystroke once the value matches `/^#[0-9a-fA-F]{6}$/`. On blur the input resets to the last committed value if the entry was incomplete.
- **Sync**: while the text input is focused, programmatic `value` updates do not overwrite what the user is typing.

## Accessibility

- The native color input (`<input type="color">`) has `aria-label="Pick color"`.
- The hex text input has `aria-label="Hex color value"`.
- Both inputs are keyboard operable — Tab to focus, Enter/Space to open the dialog, typing for hex entry.
- Focus ring is visible via `:focus-visible` on both the text input and the swatch wrapper.

## Theming

All visual properties reference `--bambi-*` CSS custom properties. Override them in your `global.css`:

```css
@import "@bambi-ui/theme/tokens.css";

:root {
  --bambi-border: oklch(80% 0 0);
  --bambi-radius-sm: 0.25rem;
}
```

| Token                | Used for                          |
|----------------------|-----------------------------------|
| `--bambi-border`     | Swatch border and input border    |
| `--bambi-radius-sm`  | Swatch and input corner radius    |
| `--bambi-muted`      | Text input background             |
| `--bambi-foreground` | Text input color                  |
| `--bambi-font-mono`  | Text input font (hex values)      |
| `--bambi-shadow-sm`  | Swatch drop shadow                |
| `--bambi-ring`       | Focus ring color                  |
