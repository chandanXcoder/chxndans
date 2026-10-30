import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, services } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Button, { Arrow } from "@/components/ui/Button";
import WorksSlider from "@/components/WorksSlider";
import ServicesScene from "@/components/illustrations/ServicesScene";
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
  const project = projects.find((p) => p.slug === s.project);
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <section className="card pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
        <Reveal stagger={0.1}>
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
          <h1 className="max-w-5xl font-display text-[12vw] font-medium leading-[0.95] tracking-[-0.04em] sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl">
            {s.title}
          </h1>
          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-muted md:text-2xl">{s.intro}</p>
          <div className="mt-8">
            <Button href="/contact/book-project">Start this project</Button>
          </div>
        </Reveal>
        <div className="mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]">
          <ServicesScene />
        </div>
        </div>
      </section>

      <section className="card py-20 md:py-28">
        <div className="container-x">
        <Reveal className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-2 lg:gap-10">
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
            <div key={d.title} className="rounded-3xl border border-line bg-surface p-6 sm:p-8 md:p-10">
              <p className="mb-6 font-display sm:mb-10 text-lg text-muted">{String(i + 1).padStart(2, "0")}</p>
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
        </div>
      </section>

      <Process />

      {/* related project first, then the rest */}
      <WorksSlider items={project ? [project, ...projects.filter((p) => p !== project)] : projects} />

      <section className="card py-20 md:py-28">
        <div className="container-x">
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
        </div>
      </section>

      <CTA />
    </>
  );
}
