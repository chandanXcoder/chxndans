"use client";

import { usePathname } from "next/navigation";

// Renders its children everywhere except the admin panel.
export default function SiteOnly({ children }: { children: React.ReactNode }) {
  return usePathname().startsWith("/admin") ? null : children;
}
