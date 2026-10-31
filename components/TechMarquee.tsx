import { techIcons } from "./illustrations/techIcons";
import TechLogo from "./ui/TechLogo";

const all = Object.values(techIcons);
const rows = [all, [...all].reverse()];

// Two rows of brand logos scrolling in opposite directions.
export default function TechMarquee() {
  return (
    <section aria-label="Tech stack" className="card space-y-4 overflow-hidden py-10 md:py-14">
      {rows.map((row, r) => (
        <div key={r} aria-hidden={r > 0} className="marquee overflow-hidden">
          <div className="marquee-track flex w-max" style={r ? { animationDirection: "reverse" } : undefined}>
            {/* rendered twice so the -50% translate loops seamlessly */}
            {[...row, ...row].map((icon, i) => (
              <span
                key={i}
                aria-hidden={i >= row.length}
                className="mr-4 flex shrink-0 items-center gap-3 rounded-full border border-line bg-surface py-2.5 pr-6 pl-2.5 transition-colors hover:border-fg/30"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-bg shadow-sm">
                  <TechLogo icon={icon} className="h-[18px] w-[18px]" />
                </span>
                <span className="font-display text-lg font-medium tracking-tight">{icon.title}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
