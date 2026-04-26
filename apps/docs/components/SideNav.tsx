"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const NAV: Record<string, { href: string; label: string }[]> = {
  Components: [
    { href: "/components/button", label: "Button" },
    { href: "/components/card", label: "Card" },
    { href: "/components/code", label: "Code" },
    { href: "/components/color-picker", label: "ColorPicker" },
    { href: "/components/tabs", label: "Tabs" },
    { href: "/components/typography", label: "Typography" },
  ],
  Theming: [{ href: "/theme", label: "Theme Builder" }],
  Primitives: [{ href: "/packages/a11y", label: "a11y" }],
};

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="w-[220px] shrink-0 border-r border-border px-6 py-8">
      <Link
        href="/"
        className="mb-8 block text-base font-bold text-foreground no-underline"
      >
        @bambi-ui
      </Link>

      {Object.entries(NAV).map(([section, items], i) => (
        <div key={section}>
          <p
            className={`mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground${i > 0 ? " mt-6" : ""}`}
          >
            {section}
          </p>
          {items.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block py-1.5 text-sm no-underline transition-colors hover:text-foreground ${
                pathname.startsWith(href) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      ))}

      <ThemeToggle />
    </nav>
  );
}
