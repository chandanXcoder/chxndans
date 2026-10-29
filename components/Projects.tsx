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
      <article className="group grid gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
        <Link
          href={href}
          className={`block ${index % 2 ? "" : "md:order-2"}`}
          aria-label={`${p.title} case study`}
        >
          <ProjectVisual p={p} index={index} className="aspect-[4/3]" />
        </Link>

        <div className="flex flex-col md:py-2">
          <p className="mb-6 flex items-center gap-3 text-lg">
            <span className="h-2 w-2 rounded-full bg-fg" />
            {p.category}
          </p>
          <h3 className="mb-6 font-display text-5xl font-medium tracking-tight md:text-6xl">
            <Link href={href}>{p.title}</Link>
          </h3>
          <p className="max-w-xl text-lg leading-relaxed md:text-xl">
            {p.summary}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 md:mt-12 md:flex md:flex-wrap md:gap-x-12 md:gap-y-8">
            {p.metrics.map((m) => (
              <div key={m.label} className="md:min-w-[6rem]">
                <p className="font-display text-[1.7rem] font-medium tracking-tight sm:text-4xl md:text-5xl">
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
            className="mt-12 inline-flex w-fit items-center gap-3 text-lg md:mt-auto md:pt-12"
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
                A news platform, a client e-commerce store and a Play Store app,
                all built and shipped end to end.
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
