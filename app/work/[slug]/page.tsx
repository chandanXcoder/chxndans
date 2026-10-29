import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/ui/Reveal";
import Button, { Arrow } from "@/components/ui/Button";
import CTA from "@/components/CTA";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();

  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const external = p.link?.href.startsWith("http");

  return (
    <>
      <section className="card pt-32 pb-14 md:pt-44 md:pb-20">
        <div className="container-x">
          <Reveal stagger={0.1}>
            <Link
              href="/work"
              className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <Arrow className="-rotate-135" />
              All work
            </Link>
            <div className="mb-6 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-line px-3 py-1.5 text-muted">{p.category}</span>
              <span className="rounded-full border border-line px-3 py-1.5 text-muted">{p.year}</span>
            </div>
            <h1 className="font-display text-[15vw] font-medium leading-[0.9] tracking-[-0.04em] md:text-[10rem]">
              {p.title}
            </h1>
            <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <p className="max-w-2xl text-xl leading-relaxed text-muted md:text-2xl">{p.summary}</p>
              {p.link && (
                <div className="md:justify-self-end">
                  <Button href={p.link.href} external={external}>
                    {p.link.label}
                  </Button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="card py-6 md:py-8">
        <div className="container-x">
        <Reveal>
          <div className="group">
            <ProjectVisual p={p} index={index} className="aspect-[4/3] md:aspect-[16/8]" />
          </div>
        </Reveal>

        <Reveal stagger={0.08} className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-3xl border border-line bg-line">
          {p.metrics.map((m) => (
            <div key={m.label} className="bg-bg p-4 md:p-8">
              <p className="font-display text-xl font-medium tracking-tight sm:text-3xl md:text-5xl">{m.value}</p>
              <p className="mt-2 text-xs text-muted sm:text-base">{m.label}</p>
            </div>
          ))}
        </Reveal>
        </div>
      </section>

      <section className="card py-20 md:py-28">
        <div className="container-x">
        <div className="grid gap-x-20 gap-y-16 md:grid-cols-[1fr_2fr]">
          <Reveal stagger={0.08} className="space-y-8 md:sticky md:top-28 md:self-start">
            <Info label="My role" value={p.role} />
            <Info label="Year" value={p.year} />
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Tech stack</p>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1.5 text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-16">
            <Block n="01" title="The challenge">
              <p>{p.challenge}</p>
            </Block>
            <Block n="02" title="What I built">
              <ul className="space-y-4">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-4">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </Block>
            <Block n="03" title="The outcome">
              <p>{p.outcome}</p>
            </Block>
          </div>
        </div>
        </div>
      </section>

      <section className="card py-6 md:py-8">
        <div className="container-x">
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:py-16"
        >
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Next project</p>
            <p className="font-display text-5xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-8xl">
              {next.title}
            </p>
          </div>
          <span className="grid h-16 w-16 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink md:h-24 md:w-24">
            <Arrow className="h-5! w-5! transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </Link>
        </div>
      </section>

      <CTA />
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
      <p className="text-lg">{value}</p>
    </div>
  );
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="border-t border-line pt-8">
        <p className="mb-4 font-display text-sm text-accent">{n}</p>
        <h2 className="mb-6 font-display text-3xl font-medium tracking-tight md:text-5xl">{title}</h2>
        <div className="text-lg leading-relaxed text-muted md:text-xl">{children}</div>
      </div>
    </Reveal>
  );
}
