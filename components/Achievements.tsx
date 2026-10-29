import { achievements } from "@/lib/content";
import Reveal from "./ui/Reveal";

export default function Achievements() {
  return (
    <section className="container-x pb-24 md:pb-36">
      <Reveal stagger={0.08} className="grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a) => (
          <div key={a.title} className="flex flex-col bg-bg p-8 md:p-10">
            <p className="font-display text-6xl font-medium tracking-tight md:text-7xl">
              {a.value}
              {a.unit && <span className="ml-2 text-2xl text-muted">{a.unit}</span>}
            </p>
            <h3 className="mt-10 mb-2 font-display text-2xl font-medium tracking-tight">{a.title}</h3>
            <p className="leading-relaxed text-muted">{a.text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
