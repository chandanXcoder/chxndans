import { skills } from "@/lib/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function Skills({ heading = true }: { heading?: boolean }) {
  return (
    <section id="skills" className="card py-20 md:py-28">
      <div className="container-x">
        {heading && (
          <SectionHeading
            label="Skills & stack"
            title={
              <>
                Tools I use to
                <br />
                <span className="text-muted">ship fast.</span>
              </>
            }
          />
        )}

        <Reveal stagger={0.1} className="border-b border-line">
          {skills.map((s, i) => (
            <div
              key={s.title}
              className="group grid gap-4 border-t border-line py-8 transition-colors duration-500 hover:bg-surface md:grid-cols-[80px_1fr_1.3fr] md:items-center md:gap-8 md:px-6 md:py-10"
            >
              <span className="font-display text-sm text-muted">0{i + 1}</span>
              <div>
                <h3 className="font-display text-3xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-muted">{s.blurb}</p>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {s.items.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-4 py-2 text-sm transition-colors duration-300 group-hover:border-fg/30"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
