import { experience } from "@/lib/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function Experience({ heading = true }: { heading?: boolean }) {
  return (
    <section id="experience" className="card py-20 md:py-28">
      <div className="container-x">
        {heading && (
          <SectionHeading
            label="Experience & leadership"
            title={
              <>
                Building, shipping
                <br />
                <span className="text-muted">&amp; leading.</span>
              </>
            }
            aside={
              <p className="max-w-xs text-muted">
                Freelance delivery, club leadership, and running some of the
                biggest tech events on campus.
              </p>
            }
          />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={(i % 2) * 0.1}>
              <article className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-accent/40 md:p-10">
                <div className="mb-10 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted">
                  <span>{e.period}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-line font-display text-fg transition-colors group-hover:bg-accent group-hover:text-accent-ink">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                  {e.role}
                </h3>
                <p className="mt-2 mb-8 text-sm font-medium text-fg/70">
                  {e.org}
                </p>
                <ul className="mt-auto space-y-3 text-muted">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3 leading-relaxed">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-fg/40" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
