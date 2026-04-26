import type { Metadata } from "next";
import path from "path";
import { Heading, Text } from "@bambi-ui/typography";
import { CodeBlock } from "@/components/CodeBlock";
import { ReadmeBlock } from "@/components/ReadmeBlock";

export const metadata: Metadata = {
  title: "Typography",
  description:
    "Typography components for bambi-ui — Heading (h1–h6) and Text (body, lead, small, muted, label). Fully accessible and WCAG 2.2 AA compliant.",
};

export default function TypographyPage() {
  return (
    <>
      <Heading level={1} className="mb-2">Typography</Heading>
      <Text variant="lead" className="mb-10">
        Semantic heading and text components with consistent scale and theming.
      </Text>

      {/* Heading */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Heading</h2>
      <div className="mb-2 flex flex-col gap-3 rounded-lg border border-border bg-secondary p-8">
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
        <Heading level={6}>Heading 6</Heading>
      </div>
      <CodeBlock lang="tsx" code={`<Heading level={1}>Heading 1</Heading>
<Heading level={2}>Heading 2</Heading>
<Heading level={3}>Heading 3</Heading>
<Heading level={4}>Heading 4</Heading>
<Heading level={5}>Heading 5</Heading>
<Heading level={6}>Heading 6</Heading>`} />

      {/* Text variants */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Text</h2>
      <div className="mb-2 flex flex-col gap-4 rounded-lg border border-border bg-secondary p-8">
        <Text>Body — The quick brown fox jumps over the lazy dog.</Text>
        <Text variant="lead">Lead — A larger introductory paragraph that sets the scene.</Text>
        <Text variant="small">Small — Fine print or secondary information.</Text>
        <Text variant="muted">Muted — Subdued helper or descriptive text.</Text>
        <Text variant="label" as="span">Label</Text>
      </div>
      <CodeBlock lang="tsx" code={`<Text>Body text</Text>
<Text variant="lead">Lead text</Text>
<Text variant="small">Small text</Text>
<Text variant="muted">Muted text</Text>
<Text variant="label" as="span">Label</Text>`} />

      {/* Decoupled style and element */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Decoupled style and element
      </h2>
      <div className="mb-2 flex flex-col gap-2 rounded-lg border border-border bg-secondary p-8">
        <Heading level={1} as="h2">h2 in DOM, styled as h1</Heading>
        <Heading level={3} as="h2">h2 in DOM, styled as h3</Heading>
      </div>
      <CodeBlock lang="tsx" code={`{/* h2 in the DOM, styled as h1 */}
<Heading level={1} as="h2">Section title</Heading>

{/* h2 in the DOM, styled as h3 */}
<Heading level={3} as="h2">Subsection</Heading>`} />

      {/* Custom element on Text */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Custom element
      </h2>
      <div className="mb-2 flex flex-col gap-2 rounded-lg border border-border bg-secondary p-8">
        <Text variant="muted" as="div">div rendered as muted text</Text>
        <Text variant="label" as="span">span rendered as label</Text>
        <Text variant="small" as="strong">strong rendered as small</Text>
      </div>
      <CodeBlock lang="tsx" code={`<Text variant="muted" as="div">div rendered as muted text</Text>
<Text variant="label" as="span">span rendered as label</Text>
<Text variant="small" as="strong">strong rendered as small</Text>`} />

      <hr className="border-border" />
      <div className="mt-8">
        <ReadmeBlock packagePath={path.join(process.cwd(), "../../packages/typography/README.md")} />
      </div>
    </>
  );
}
