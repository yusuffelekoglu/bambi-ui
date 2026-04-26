import type { Metadata } from "next";
import "./globals.css";
import { SideNav } from "@/components/SideNav";

export const metadata: Metadata = {
  title: {
    default: "bambi-ui — Accessible React UI",
    template: "%s — bambi-ui",
  },
  description:
    "bambi-ui is an accessibility-first React UI component library built on web standards. WCAG 2.2 AA compliant components with full keyboard and screen-reader support.",
  keywords: "bambi-ui, react, ui, component library, accessibility, a11y, wcag, typescript, tailwind, design tokens",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem("theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;if(s==="dark"||(s===null&&d))document.documentElement.classList.add("dark")})()`,
          }}
        />
      </head>
      <body className="flex min-h-screen bg-background text-foreground">
        <SideNav />
        <main className="flex-1 px-16 py-12">{children}</main>
      </body>
    </html>
  );
}
