import { stats } from "@/lib/content";

export default function StatsMarquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const row = [...stats, ...stats];
  return (
    <div className="marquee overflow-hidden border-y border-line bg-surface/40 py-6">
      <div className="marquee-track flex w-max">
        {row.map((s, i) => (
          <div
            key={i}
            aria-hidden={i >= stats.length}
            className="flex shrink-0 items-center gap-4 px-8 md:px-12"
          >
            <span className="font-display text-3xl font-medium tracking-tight md:text-4xl">{s.value}</span>
            <span className="max-w-[9rem] text-xs uppercase leading-snug tracking-[0.14em] text-muted">
              {s.label}
            </span>
            <span className="ml-8 text-accent md:ml-12">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
