import { process } from "@/lib/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function Process() {
  return (
    <section className="bg-surface/60 py-24 md:py-36">
      <div className="container-x">
        <SectionHeading label="How I work" title={<>A simple process, from first call to launch day.</>} />
        <Reveal stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <div key={step.title} className="rounded-3xl border border-line bg-bg p-7">
              <p className="mb-12 font-display text-lg text-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mb-3 font-display text-2xl font-medium tracking-tight">{step.title}</h3>
              <p className="leading-relaxed text-muted">{step.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
