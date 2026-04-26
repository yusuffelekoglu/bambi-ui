import type { Metadata } from "next";
import { Card } from "@bambi-ui/card";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Card",
  description:
    "Card component for bambi-ui — semantic surface with composable layout. Accessible and WCAG 2.2 AA compliant.",
};

export default function CardPage() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Card</h1>
      <p className="mb-10 text-muted-foreground">
        Outbound link card with automatic UTM parameters appended to the href.
      </p>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Preview</h2>
      <div className="mb-10 grid grid-cols-2 gap-4 rounded-lg border border-border bg-secondary p-8">
        <Card title="Documentation" href="https://astro.build">
          Learn how to build with Astro.
        </Card>
        <Card title="GitHub" href="https://github.com">
          Browse the source code.
        </Card>
      </div>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Usage</h2>
      <CodeBlock lang="tsx" code={`import { Card } from "@bambi-ui/card";

<Card title="Docs" href="https://example.com">
  Description text here.
</Card>`} />

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Props</h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b border-border px-4 py-2 text-left font-medium text-muted-foreground">Prop</th>
            <th className="border-b border-border px-4 py-2 text-left font-medium text-muted-foreground">Type</th>
            <th className="border-b border-border px-4 py-2 text-left font-medium text-muted-foreground">Required</th>
            <th className="border-b border-border px-4 py-2 text-left font-medium text-muted-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b border-border/50 px-4 py-2"><code className="rounded bg-muted px-1 text-xs">title</code></td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground"><code className="rounded bg-muted px-1 text-xs">string</code></td>
            <td className="border-b border-border/50 px-4 py-2">✓</td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground">Card heading.</td>
          </tr>
          <tr>
            <td className="border-b border-border/50 px-4 py-2"><code className="rounded bg-muted px-1 text-xs">href</code></td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground"><code className="rounded bg-muted px-1 text-xs">string</code></td>
            <td className="border-b border-border/50 px-4 py-2">✓</td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground">Destination URL. UTM parameters are appended automatically.</td>
          </tr>
          <tr>
            <td className="border-b border-border/50 px-4 py-2"><code className="rounded bg-muted px-1 text-xs">children</code></td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground"><code className="rounded bg-muted px-1 text-xs">ReactNode</code></td>
            <td className="border-b border-border/50 px-4 py-2">✓</td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground">Card description.</td>
          </tr>
          <tr>
            <td className="px-4 py-2"><code className="rounded bg-muted px-1 text-xs">className</code></td>
            <td className="px-4 py-2 text-muted-foreground"><code className="rounded bg-muted px-1 text-xs">string</code></td>
            <td className="px-4 py-2">—</td>
            <td className="px-4 py-2 text-muted-foreground">Additional Tailwind classes or custom CSS class.</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
