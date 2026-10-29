import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, services } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Button, { Arrow } from "@/components/ui/Button";
import ProjectVisual from "@/components/ProjectVisual";
import Process from "@/components/Process";
import CTA from "@/components/CTA";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.title, description: s.desc } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const index = services.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();

  const s = services[index];
  const projectIndex = projects.findIndex((p) => p.slug === s.project);
  const project = projectIndex === -1 ? undefined : projects[projectIndex];
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <section className="pt-32 pb-16 md:pt-44 md:pb-24">
        <Reveal stagger={0.1} className="container-x">
          <Link
            href="/services"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <Arrow className="-rotate-135" />
            All services
          </Link>
          <p className="mb-6 flex items-center gap-3 text-lg">
            <span className="h-2 w-2 rounded-full bg-fg" />
            Service {String(index + 1).padStart(2, "0")}
          </p>
          <h1 className="max-w-5xl font-display text-[12vw] font-medium leading-[0.95] tracking-[-0.04em] sm:text-7xl md:text-8xl">
            {s.title}
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <p className="max-w-2xl text-xl leading-relaxed text-muted md:text-2xl">{s.intro}</p>
            <div className="md:justify-self-end">
              <Button href="/contact">Start this project</Button>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-x pb-24 md:pb-36">
        <Reveal className="mb-12 grid gap-6 md:mb-16 md:grid-cols-2 md:gap-10">
          <p className="flex items-center gap-3 self-start text-lg md:pt-3">
            <span className="h-2 w-2 rounded-full bg-fg" />
            What you get
          </p>
          <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl">
            Everything included, start to finish.
          </h2>
        </Reveal>
        <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-2">
          {s.deliverables.map((d, i) => (
            <div key={d.title} className="rounded-3xl border border-line bg-surface p-8 md:p-10">
              <p className="mb-10 font-display text-lg text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mb-3 font-display text-2xl font-medium tracking-tight md:text-3xl">{d.title}</h3>
              <p className="leading-relaxed text-muted">{d.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16 flex flex-col gap-5 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <p className="text-lg">Tech I use</p>
          <div className="flex flex-wrap gap-2">
            {s.stack.map((t) => (
              <span key={t} className="rounded-full border border-line px-4 py-2 text-sm">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <Process />

      {project && (
        <section className="container-x py-24 md:py-36">
          <Reveal className="group grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
            <Link href={`/work/${project.slug}`} aria-label={`${project.title} case study`}>
              <ProjectVisual p={project} index={projectIndex} />
            </Link>
            <div>
              <p className="mb-6 flex items-center gap-3 text-lg">
                <span className="h-2 w-2 rounded-full bg-fg" />
                Related work
              </p>
              <h2 className="mb-6 font-display text-5xl font-medium tracking-tight md:text-6xl">{project.title}</h2>
              <p className="mb-10 max-w-lg text-lg leading-relaxed md:text-xl">{project.summary}</p>
              <Button href={`/work/${project.slug}`} variant="ghost">
                View case study
              </Button>
            </div>
          </Reveal>
        </section>
      )}

      <section className="container-x pb-24 md:pb-32">
        <p className="mb-8 flex items-center gap-3 text-lg">
          <span className="h-2 w-2 rounded-full bg-fg" />
          Other services
        </p>
        <div className="border-t border-line">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/services/${o.slug}`}
              className="group flex items-center justify-between border-b border-line py-5 font-display text-2xl tracking-tight md:text-3xl"
            >
              <span className="transition-transform duration-500 group-hover:translate-x-3">{o.title}</span>
              <Arrow className="h-5! w-5! transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
