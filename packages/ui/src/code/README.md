# Code

Satır içi kod bloğu render eden ince bir sarmalayıcı (`<code>` etiketi).

| Prop        | Tip         | Zorunlu | Açıklama    |
|-------------|-------------|---------|-------------|
| `children`  | `ReactNode` | ✓       | Kod içeriği |
| `className` | `string`    |         | Stil sınıfı |

```tsx
import { Code } from "@bambi/ui/code";

<Code className="highlight">npm install</Code>
```

---

A thin wrapper that renders an inline code block (`<code>` element).

| Prop        | Type        | Required | Description  |
|-------------|-------------|----------|--------------|
| `children`  | `ReactNode` | ✓        | Code content |
| `className` | `string`    |          | CSS class    |

```tsx
import { Code } from "@bambi/ui/code";

<Code className="highlight">npm install</Code>
```
