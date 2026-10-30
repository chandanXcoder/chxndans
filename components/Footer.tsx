import Link from "next/link";
import { nav, projects, services, site } from "@/lib/content";
import { Arrow } from "./ui/Button";

const socials = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Play Store", href: site.socials.playStore },
  { label: "Instagram", href: site.socials.instagram },
  { label: "WhatsApp", href: site.socials.whatsapp },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden pt-8 pb-8 md:pt-12">
      <div className="container-x">
        <p className="mb-10 flex items-center gap-3 text-lg md:mb-14">
          <span className="h-2 w-2 rounded-full bg-fg" />
          Contact us
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1.3fr_1fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <p className="max-w-sm font-display text-2xl leading-snug tracking-tight md:text-3xl">
              Thanks for scrolling this far. Let&apos;s make something people actually use.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-2 border-b border-fg/30 pb-1 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {site.email}
              <Arrow />
            </a>
            <a href={site.phoneHref} className="mt-3 block text-muted transition-colors hover:text-fg">
              {site.phone}
            </a>
          </div>

          <FooterCol title="Menu" links={nav} />
          <FooterCol title="Projects" links={projects.map((p) => ({ label: p.title, href: `/work/${p.slug}` }))} />
          <FooterCol
            title="Services"
            links={services.slice(0, 5).map((s) => ({ label: s.title, href: `/services/${s.slug}` }))}
          />
          <FooterCol title="Socials" links={socials.filter((s) => s.href !== "#")} external />
        </div>

        <Link
          href="/contact"
          className="group mt-20 block font-display text-[clamp(4rem,15vw,15rem)] leading-[0.85] font-semibold tracking-[-0.05em] md:mt-28"
        >
          <span className="text-fg/10 transition-colors duration-500 group-hover:text-glow">Let&apos;s build</span>
        </Link>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.name}. Designed &amp; built by me.
          </p>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
            Back to top
            <Arrow className="-rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  external,
}: {
  title: string;
  links: { label: string; href: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <p className="mb-5 text-xs uppercase tracking-[0.2em] text-muted">{title}</p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
