# Button

`"use client"` bileşeni. Tıklandığında hangi uygulamadan geldiğini belirten bir alert gösterir.

| Prop        | Tip         | Zorunlu | Açıklama                                  |
|-------------|-------------|---------|-------------------------------------------|
| `children`  | `ReactNode` | ✓       | Buton içeriği                             |
| `appName`   | `string`    | ✓       | Alert mesajında gösterilecek uygulama adı |
| `className` | `string`    |         | Stil sınıfı                               |

```tsx
import { Button } from "@bambi/ui/button";

<Button appName="web" className="btn-primary">
  Tıkla
</Button>
```

---

A `"use client"` component. Shows an alert indicating which app it was triggered from when clicked.

| Prop        | Type        | Required | Description                              |
|-------------|-------------|----------|------------------------------------------|
| `children`  | `ReactNode` | ✓        | Button content                           |
| `appName`   | `string`    | ✓        | App name shown in the alert message      |
| `className` | `string`    |          | CSS class                                |

```tsx
import { Button } from "@bambi/ui/button";

<Button appName="web" className="btn-primary">
  Click me
</Button>
```
