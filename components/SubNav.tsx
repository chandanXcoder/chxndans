"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";

// Pill tabs listing the sibling pages of a nav section (e.g. About → Overview, Experience…).
export default function SubNav({ section }: { section: string }) {
  const pathname = usePathname();
  const items = nav.find((n) => n.label === section)?.children?.filter((c) => !c.external) ?? [];

  return (
    <div className="mt-10 flex flex-wrap gap-2">
      {items.map((c) => {
        const active = pathname === c.href;
        return (
          <Link
            key={c.href}
            href={c.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              active ? "bg-fg text-bg" : "bg-surface text-fg/80 hover:bg-surface-2"
            }`}
          >
            {c.label}
          </Link>
        );
      })}
    </div>
  );
}
