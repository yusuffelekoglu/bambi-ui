import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { ColorPickerDemo } from "@/components/ColorPickerDemo";

export const metadata: Metadata = {
  title: "ColorPicker",
  description:
    "ColorPicker component for bambi-ui — accessible, keyboard-navigable oklch color picker. Fully WCAG 2.2 AA compliant with native dialog support.",
};

export default function ColorPickerPage() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">ColorPicker</h1>
      <p className="mb-10 text-muted-foreground">
        Controlled color-picker component. Clicking the swatch opens the browser&apos;s native color
        dialog; the hex field accepts manual input. Both inputs stay in sync.
      </p>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Preview</h2>
      <div className="mb-10 flex flex-col gap-4 rounded-lg border border-border bg-secondary p-8">
        <ColorPickerDemo />
        <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" /> Primary
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-destructive" /> Destructive
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-muted" /> Muted
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          The demo above is interactive. For token-level editing, open the{" "}
          <Link href="/theme" className="text-primary hover:underline">Theme Builder</Link>.
        </p>
      </div>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Usage</h2>
      <CodeBlock lang="tsx" code={`import { ColorPicker } from "@bambi-ui/color-picker";
import { useState } from "react";

function Example() {
  const [color, setColor] = useState("#3b72e8");

  return <ColorPicker value={color} onChange={setColor} />;
}`} />

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
            <td className="border-b border-border/50 px-4 py-2"><code className="rounded bg-muted px-1 text-xs">value</code></td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground"><code className="rounded bg-muted px-1 text-xs">string</code></td>
            <td className="border-b border-border/50 px-4 py-2">✓</td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground">Current hex color value (<code className="rounded bg-muted px-1 text-xs">#rrggbb</code>).</td>
          </tr>
          <tr>
            <td className="border-b border-border/50 px-4 py-2"><code className="rounded bg-muted px-1 text-xs">onChange</code></td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground"><code className="rounded bg-muted px-1 text-xs">(value: string) =&gt; void</code></td>
            <td className="border-b border-border/50 px-4 py-2">✓</td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground">Called whenever the color changes.</td>
          </tr>
          <tr>
            <td className="px-4 py-2"><code className="rounded bg-muted px-1 text-xs">className</code></td>
            <td className="px-4 py-2 text-muted-foreground"><code className="rounded bg-muted px-1 text-xs">string</code></td>
            <td className="px-4 py-2">—</td>
            <td className="px-4 py-2 text-muted-foreground">Additional Tailwind classes.</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
