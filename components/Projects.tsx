import Link from "next/link";
import { projects as allProjects, type Project } from "@/lib/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import ProjectVisual from "./ProjectVisual";

// Eloqwnt-style showcase row: copy + big metrics on one side, large visual on the other.
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const href = `/work/${p.slug}`;
  return (
    <Reveal>
      <article className="group grid gap-10 lg:grid-cols-2 lg:gap-20 xl:gap-24">
        <Link
          href={href}
          className={`block ${index % 2 ? "" : "lg:order-2"}`}
          aria-label={`${p.title} case study`}
        >
          <ProjectVisual p={p} index={index} className="aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3]" />
        </Link>

        <div className="flex flex-col lg:py-2">
          <p className="mb-6 flex items-center gap-3 text-lg">
            <span className="h-2 w-2 rounded-full bg-fg" />
            {p.category}
          </p>
          <h3 className="mb-6 font-display text-[2.6rem] leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl">
            <Link href={href}>{p.title}</Link>
          </h3>
          <p className="max-w-xl text-lg leading-relaxed md:text-xl">
            {p.summary}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-x-12 sm:gap-y-6 lg:mt-12 lg:gap-y-8">
            {p.metrics.map((m) => (
              <div key={m.label} className="sm:min-w-[6rem]">
                <p className="font-display text-[clamp(1.4rem,6.5vw,1.9rem)] font-medium whitespace-nowrap tracking-tight sm:text-4xl xl:text-5xl">
                  {m.value}
                </p>
                <p className="mt-2 max-w-[9rem] text-[10px] uppercase sm:text-xs md:mt-3 leading-snug tracking-wide text-muted">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href={href}
            className="mt-10 inline-flex w-fit items-center gap-3 text-lg lg:mt-auto lg:pt-12"
          >
            Explore
            <svg
              viewBox="0 0 24 16"
              fill="none"
              className="h-3.5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden
            >
              <path
                d="M0 8h22M15 1l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

type Props = {
  items?: Project[];
  showAll?: boolean;
  heading?: boolean;
};

export default function Projects({
  items = allProjects,
  showAll,
  heading = true,
}: Props) {
  return (
    <section id="work" className="card py-20 md:py-28">
      <div className="container-x">
        {heading && (
          <SectionHeading
            label="Selected work"
            title={
              <>
                Real products,
                <br />
                <span className="text-muted">real users.</span>
              </>
            }
            aside={
              <p className="max-w-xs text-muted">
                A news platform, a client e-commerce store, a Play Store app and a
                university club platform, all built and shipped end to end.
              </p>
            }
          />
        )}
        <div className="space-y-24 md:space-y-36">
          {items.map((p) => (
            <ProjectCard key={p.slug} p={p} index={allProjects.indexOf(p)} />
          ))}
        </div>
        {showAll && (
          <div className="mt-20 flex justify-center">
            <Button href="/work" variant="ghost">
              All projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
