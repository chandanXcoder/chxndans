import type { MetadataRoute } from "next";
import { projects, services } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

const pages = [
  "",
  "/about",
  "/about/experience",
  "/about/clubs",
  "/about/skills",
  "/about/achievements",
  "/work",
  "/services",
  "/contact",
  "/contact/book-call",
  "/contact/book-project",
  "/contact/faq",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: `${siteUrl}/work/${p.slug}`, priority: 0.8 })),
    ...services.map((s) => ({ url: `${siteUrl}/services/${s.slug}`, priority: 0.6 })),
  ];
}
