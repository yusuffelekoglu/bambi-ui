import type { Metadata } from "next";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "bambi-ui — Accessible React UI",
  description:
    "bambi-ui — accessibility-first React UI component library. WCAG 2.2 AA compliant components with full keyboard and screen-reader support, built on CSS design tokens and web standards.",
};

export default function OverviewPage() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">@bambi-ui</h1>
      <p className="mb-10 text-muted-foreground">
        Shared React component library for the Bambi monorepo.
      </p>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Components
      </h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b border-border px-4 py-2 text-left font-medium text-muted-foreground">
              Component
            </th>
            <th className="border-b border-border px-4 py-2 text-left font-medium text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b border-border/50 px-4 py-2">
              <Link href="/components/button" className="text-primary hover:underline">
                <code>Button</code>
              </Link>
            </td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground">
              Accessible button with 8 variants, 4 sizes, loading state, and icon support.
            </td>
          </tr>
          <tr>
            <td className="border-b border-border/50 px-4 py-2">
              <Link href="/components/card" className="text-primary hover:underline">
                <code>Card</code>
              </Link>
            </td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground">
              Semantic surface component with composable layout.
            </td>
          </tr>
          <tr>
            <td className="border-b border-border/50 px-4 py-2">
              <Link href="/components/code" className="text-primary hover:underline">
                <code>Code</code>
              </Link>
            </td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground">
              Styled inline monospace code snippet built on the native{" "}
              <code className="rounded bg-muted px-1 text-xs">&lt;code&gt;</code> element.
            </td>
          </tr>
          <tr>
            <td className="border-b border-border/50 px-4 py-2">
              <Link href="/components/color-picker" className="text-primary hover:underline">
                <code>ColorPicker</code>
              </Link>
            </td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground">
              Keyboard-navigable oklch color picker with accessible dialog.
            </td>
          </tr>
          <tr>
            <td className="border-b border-border/50 px-4 py-2">
              <Link href="/components/tabs" className="text-primary hover:underline">
                <code>Tabs</code>
              </Link>
            </td>
            <td className="border-b border-border/50 px-4 py-2 text-muted-foreground">
              Accessible tabbed interface with keyboard navigation and full ARIA support.
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">
              <Link href="/components/typography" className="text-primary hover:underline">
                <code>Typography</code>
              </Link>
            </td>
            <td className="px-4 py-2 text-muted-foreground">
              Semantic heading and text components with consistent scale and theming.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="mb-3 mt-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Theming
      </h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b border-border px-4 py-2 text-left font-medium text-muted-foreground">
              Tool
            </th>
            <th className="border-b border-border px-4 py-2 text-left font-medium text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">
              <Link href="/theme" className="text-primary hover:underline">
                Theme Builder
              </Link>
            </td>
            <td className="px-4 py-2 text-muted-foreground">
              Interactively customize all design tokens and export a ready-to-paste{" "}
              <code className="rounded bg-muted px-1 text-xs">global.css</code> snippet.
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="mb-3 mt-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Installation
      </h2>
      <CodeBlock
        lang="tsx"
        code={`import { Button } from "@bambi-ui/button";
import { Card } from "@bambi-ui/card";
import { Code } from "@bambi-ui/code";
import { ColorPicker } from "@bambi-ui/color-picker";
import { Tabs, TabList, Tab, TabPanel } from "@bambi-ui/tabs";
import { Heading, Text } from "@bambi-ui/typography";
import "@bambi-ui/theme/tokens.css";`}
      />
    </>
  );
}
