import type { Metadata } from "next";
import { Code } from "@bambi-ui/code";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Code",
  description:
    "Code component for bambi-ui — styled inline monospace code snippet built on the native <code> element.",
};

export default function CodePage() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Code</h1>
      <p className="mb-10 text-muted-foreground">
        Thin wrapper that renders an inline{" "}
        <code className="rounded bg-muted px-1 text-sm">&lt;code&gt;</code> element.
      </p>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Preview</h2>
      <div className="mb-2 flex flex-col gap-3 rounded-lg border border-border bg-secondary p-8 text-sm">
        <p>Run <Code>pnpm install</Code> to get started.</p>
        <p>Import from <Code>@bambi-ui/code</Code> in your components.</p>
      </div>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Usage</h2>
      <CodeBlock lang="tsx" code={`import { Code } from "@bambi-ui/code";

<p>Run <Code>pnpm install</Code> to get started.</p>`} />

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
            <td className="border-b border-border/50 px-4 py-2"><code className="rounded bg-muted px-1 text-xs">children</code></td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground"><code className="rounded bg-muted px-1 text-xs">ReactNode</code></td>
            <td className="border-b border-border/50 px-4 py-2">✓</td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground">Code content.</td>
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
