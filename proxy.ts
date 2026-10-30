import { NextResponse, type NextRequest } from "next/server";
import { projects, services } from "@/lib/content";

const known: Record<string, Set<string>> = {
  work: new Set(projects.map((p) => p.slug)),
  services: new Set(services.map((s) => s.slug)),
};

// Unknown project/service slugs would otherwise stream the not-found page with a 200 status
// (dynamicParams isn't available with Cache Components). Rewriting to an unmatched path returns a real 404.
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  if (slug && !known[section]?.has(slug)) {
    return NextResponse.rewrite(new URL("/_missing", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/work/:slug", "/services/:slug"],
};
