# Card

Dışarıya açılan bir bağlantı kartı. `href` değerine otomatik olarak UTM parametreleri ekler.

| Prop        | Tip         | Zorunlu | Açıklama            |
|-------------|-------------|---------|---------------------|
| `title`     | `string`    | ✓       | Kart başlığı        |
| `href`      | `string`    | ✓       | Hedef URL           |
| `children`  | `ReactNode` | ✓       | Kart açıklama metni |
| `className` | `string`    |         | Stil sınıfı         |

```tsx
import { Card } from "@bambi/ui/card";

<Card title="Dökümanlar" href="https://example.com">
  Daha fazla bilgi için tıklayın.
</Card>
```

---

An outbound link card. Automatically appends UTM parameters to the `href`.

| Prop        | Type        | Required | Description          |
|-------------|-------------|----------|----------------------|
| `title`     | `string`    | ✓        | Card heading         |
| `href`      | `string`    | ✓        | Destination URL      |
| `children`  | `ReactNode` | ✓        | Card description     |
| `className` | `string`    |          | CSS class            |

```tsx
import { Card } from "@bambi/ui/card";

<Card title="Docs" href="https://example.com">
  Click to learn more.
</Card>
```
