import type { Metadata } from "next";
import path from "path";
import { Button } from "@bambi-ui/button";
import { Heading, Text } from "@bambi-ui/typography";
import { CodeBlock } from "@/components/CodeBlock";
import { ReadmeBlock } from "@/components/ReadmeBlock";

export const metadata: Metadata = {
  title: "Button",
  description:
    "Button component for bambi-ui — 8 variants (primary, secondary, outline, ghost, link, destructive, success, warning), 4 sizes, loading state, and icon support. Fully accessible and WCAG 2.2 AA compliant.",
};

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export default function ButtonPage() {
  return (
    <>
      <Heading level={1} className="mb-2">Button</Heading>
      <Text variant="lead" className="mb-10">
        Accessible, themeable button with keyboard focus ring support.
      </Text>

      {/* Variants */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Variants</h2>
      <div className="mb-2 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-secondary p-8">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
      </div>
      <CodeBlock lang="tsx" code={`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>`} />

      {/* Sizes */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Sizes</h2>
      <div className="mb-2 flex flex-wrap items-end gap-3 rounded-lg border border-border bg-secondary p-8">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add"><PlusIcon /></Button>
      </div>
      <CodeBlock lang="tsx" code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Add"><PlusIcon /></Button>`} />

      {/* With icon */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">With icon</h2>
      <div className="mb-2 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-secondary p-8">
        <Button><SaveIcon />Save changes</Button>
        <Button variant="outline">Continue<ArrowRightIcon /></Button>
        <Button variant="destructive"><TrashIcon />Delete</Button>
        <Button variant="ghost"><ShareIcon />Share</Button>
      </div>
      <CodeBlock lang="tsx" code={`<Button>
  <SaveIcon aria-hidden="true" />
  Save changes
</Button>

<Button variant="outline">
  Continue
  <ArrowRightIcon aria-hidden="true" />
</Button>`} />

      {/* Loading */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Loading</h2>
      <div className="mb-2 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-secondary p-8">
        <Button loading>Saving…</Button>
        <Button variant="secondary" loading>Loading…</Button>
        <Button variant="outline" loading>Loading…</Button>
        <Button variant="destructive" loading>Deleting…</Button>
        <Button variant="success" loading>Submitting…</Button>
        <Button size="icon" loading aria-label="Loading"><PlusIcon /></Button>
      </div>
      <CodeBlock lang="tsx" code={`<Button loading>Saving…</Button>
<Button variant="destructive" loading>Deleting…</Button>`} />

      {/* Full width */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Full width</h2>
      <div className="mb-2 flex flex-col gap-3 rounded-lg border border-border bg-secondary p-8">
        <Button className="w-full">Primary</Button>
        <Button variant="outline" className="w-full">Outline</Button>
        <Button variant="secondary" className="w-full" loading>Loading</Button>
      </div>
      <CodeBlock lang="tsx" code={`<Button className="w-full">Primary</Button>`} />

      {/* Disabled */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Disabled</h2>
      <div className="mb-2 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-secondary p-8">
        <Button disabled>Primary</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="outline" disabled>Outline</Button>
        <Button variant="ghost" disabled>Ghost</Button>
        <Button variant="link" disabled>Link</Button>
        <Button variant="destructive" disabled>Destructive</Button>
        <Button variant="success" disabled>Success</Button>
        <Button variant="warning" disabled>Warning</Button>
      </div>
      <CodeBlock lang="tsx" code={`<Button disabled>Primary</Button>`} />

      {/* All combinations */}
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">All combinations</h2>
      <div className="mb-10 overflow-x-auto rounded-lg border border-border bg-secondary p-8">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="pb-4 pr-6 text-left text-xs font-medium text-muted-foreground"></th>
              {["sm", "md", "lg", "icon", "loading"].map((h) => (
                <th key={h} className="pb-4 pr-6 text-left text-xs font-medium text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_td]:pb-3 [&_td]:pr-6">
            {(["primary", "secondary", "outline", "ghost", "link", "destructive", "success", "warning"] as const).map((v) => (
              <tr key={v}>
                <td className="text-xs text-muted-foreground">{v}</td>
                <td><Button variant={v === "primary" ? undefined : v} size="sm">Label</Button></td>
                <td><Button variant={v === "primary" ? undefined : v} size="md">Label</Button></td>
                <td><Button variant={v === "primary" ? undefined : v} size="lg">Label</Button></td>
                <td><Button variant={v === "primary" ? undefined : v} size="icon" aria-label={`${v} icon`}><PlusIcon /></Button></td>
                <td><Button variant={v === "primary" ? undefined : v} loading>Label</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="border-border" />
      <div className="mt-8">
        <ReadmeBlock packagePath={path.join(process.cwd(), "../../packages/button/README.md")} />
      </div>
    </>
  );
}
