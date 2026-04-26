import type { Metadata } from "next";
import { ThemeBuilder } from "@/components/ThemeBuilder";

export const metadata: Metadata = {
  title: "Theme Builder",
  description:
    "Interactively customize all bambi-ui design tokens — colors, radii, shadows, typography — and export a ready-to-paste global.css snippet for your project.",
};

export default function ThemePage() {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold">Theme Builder</h1>
      <p className="mb-10 text-muted-foreground">
        Customize design tokens and export a{" "}
        <code className="rounded bg-muted px-1 text-sm">global.css</code> snippet to drop into your
        project. Changes are previewed live on this page.
      </p>
      <ThemeBuilder />
    </>
  );
}
