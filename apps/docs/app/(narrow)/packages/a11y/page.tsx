import type { Metadata } from "next";
import path from "path";
import { Heading, Text } from "@bambi-ui/typography";
import { ReadmeBlock } from "@/components/ReadmeBlock";

export const metadata: Metadata = {
  title: "a11y",
  description:
    "@bambi-ui/a11y — accessibility primitives for React: focus trap, focus ring, keyboard interaction, live region announcements, and WCAG-compliant utilities.",
};

export default function A11yPage() {
  return (
    <>
      <Heading level={1} className="mb-2">@bambi-ui/a11y</Heading>
      <Text variant="lead" className="mb-10">
        Accessibility primitives used across all{" "}
        <code className="rounded bg-muted px-1 text-xs">@bambi-ui</code> components.
      </Text>

      <ReadmeBlock packagePath={path.join(process.cwd(), "../../packages/a11y/README.md")} />
    </>
  );
}
