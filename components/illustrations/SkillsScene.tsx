import Scene from "./Scene";
import Layer from "./Layer";
import { vars } from "./parts";
import { techIcons, type TechIcon } from "./techIcons";

const inner = [techIcons.react, techIcons.next, techIcons.tailwind, techIcons.typescript];
const outer = [techIcons.flutter, techIcons.dart, techIcons.node, techIcons.firebase, techIcons.supabase, techIcons.mongodb];

// Brand logo on a clean white disc; sizes follow the scene width (cqw).
function Logo({ icon }: { icon: TechIcon }) {
  return (
    <div className="flex flex-col items-center gap-[1cqw]">
      <span className="grid h-[10.5cqw] w-[10.5cqw] place-items-center rounded-full bg-white shadow-[0_10px_28px_-14px_rgba(13,14,16,0.35)] ring-1 ring-black/[0.06] transition-transform duration-300 hover:scale-110">
        <svg viewBox="0 0 24 24" className="h-[48%] w-[48%]" fill={icon.color} aria-hidden>
          <path d={icon.path} />
        </svg>
      </span>
      <span className="text-[max(8px,1.8cqw)] font-medium whitespace-nowrap text-muted">{icon.title}</span>
    </div>
  );
}

function Ring({ icons, rad, d, reverse }: { icons: TechIcon[]; rad: number; d: number; reverse?: boolean }) {
  return (
    <>
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/10"
        style={{ width: `${rad * 2}cqw`, height: `${rad * 2}cqw` }}
      />
      {icons.map((icon, i) => (
        <div key={icon.title} className="absolute top-1/2 left-1/2">
          <div
            className={reverse ? "orbit-rev" : "orbit"}
            style={vars({ "--rad": `${rad}cqw`, "--start": `${(360 / icons.length) * i}deg`, "--d": `${d}s` })}
          >
            <div className="-translate-x-1/2 -translate-y-[38%]">
              <Logo icon={icon} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

// Tech stack as two slow, counter-rotating orbits of real logos around a code mark.
export default function SkillsScene({ className }: { className?: string }) {
  return (
    <Scene
      label="Illustration of React, Next.js, Flutter, Firebase and other technology logos orbiting a code symbol"
      className={className}
      glow="from-[#f1f4f7] to-[#e9edf2]"
    >
      <Layer depth={8} className="inset-0 [container-type:inline-size]" float={false}>
        <div className="absolute inset-0">
          <span className="absolute top-1/2 left-1/2 h-[96cqw] w-[96cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fg/[0.05]" />
          <Ring icons={inner} rad={23} d={48} />
          <Ring icons={outer} rad={40} d={72} reverse />
        </div>
      </Layer>
      <Layer depth={16} className="top-1/2 left-1/2 w-[19%]" float={false}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <span className="glow absolute inset-[-14%] rounded-[30%] border border-fg/15" style={vars({ "--d": "3.6s" })} />
            <div className="grid aspect-square place-items-center rounded-[26%] bg-[#0d0e10] font-mono text-lg font-semibold text-white shadow-[0_24px_50px_-18px_rgba(13,14,16,0.6)] sm:text-3xl">
              {"</>"}
            </div>
          </div>
        </div>
      </Layer>
    </Scene>
  );
}
