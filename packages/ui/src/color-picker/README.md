# ColorPicker

Renk seçici komponenti. Swatch'a tıklayınca tarayıcının yerel renk seçici diyaloğu açılır; yanındaki hex alanına elle değer de girilebilir. Kontrollü bir komponenttir — `value` ve `onChange` zorunludur.

## Kullanım

```tsx
import { ColorPicker } from "@bambi/ui";

function Example() {
  const [color, setColor] = useState("#3b72e8");

  return <ColorPicker value={color} onChange={setColor} />;
}
```

## Props

| Prop        | Tip                        | Zorunlu | Açıklama                             |
|-------------|----------------------------|---------|--------------------------------------|
| `value`     | `string`                   | ✓       | Geçerli hex renk değeri (`#rrggbb`). |
| `onChange`  | `(value: string) => void`  | ✓       | Renk değişince çağrılır.             |
| `className` | `string`                   | —       | Ek Tailwind sınıfları.               |

---

# ColorPicker

A controlled color-picker component. Clicking the swatch opens the browser's native color-picker dialog; the adjacent hex field accepts manual input. Both inputs stay in sync.

## Usage

```tsx
import { ColorPicker } from "@bambi/ui";

function Example() {
  const [color, setColor] = useState("#3b72e8");

  return <ColorPicker value={color} onChange={setColor} />;
}
```

## Props

| Prop        | Type                       | Required | Description                          |
|-------------|----------------------------|----------|--------------------------------------|
| `value`     | `string`                   | ✓        | Current hex color value (`#rrggbb`). |
| `onChange`  | `(value: string) => void`  | ✓        | Called whenever the color changes.   |
| `className` | `string`                   | —        | Additional Tailwind classes.         |
