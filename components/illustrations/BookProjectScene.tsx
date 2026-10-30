import Scene from "./Scene";
import Layer from "./Layer";
import { Badge, Blob, Bubble, Gear, Rocket, Sparkle, card, noodles, vars } from "./parts";

const tasks = ["Scope & quote", "Design", "Build & demo", "Launch"];

// Project checklist ticking itself off, a filling progress bar and a rocket.
export default function BookProjectScene({ className }: { className?: string }) {
  return (
    <Scene label="Illustration of a project checklist being ticked off, a progress bar and a rocket" className={className} glow="from-[#e3fafc] to-[#eef2ff]">
      <Layer depth={6} className="bottom-[6%] left-[8%] w-[20%]" float={{ d: 8, delay: 0.5, r: -10 }}>
        <Blob from="#ff8fab" to="#e5383b" d={noodles.arc} />
      </Layer>

      <Layer depth={14} className="top-[14%] left-[10%] w-[52%]" float={{ d: 7, delay: 0, r: -3 }}>
        <div className={`${card} p-4 sm:p-5`}>
          <p className="mb-3 text-[10px] font-semibold sm:mb-4 sm:text-sm">Project plan</p>
          <ul className="space-y-2 sm:space-y-3">
            {tasks.map((t, i) => (
              <li key={t} className="flex items-center gap-2 text-[9px] sm:gap-3 sm:text-sm">
                <span className="relative grid h-4 w-4 shrink-0 place-items-center rounded-md border-2 border-fg/15 sm:h-5 sm:w-5">
                  <span
                    className="tick absolute inset-[-2px] grid place-items-center rounded-md bg-emerald-500 text-[9px] text-white sm:text-xs"
                    style={vars({ "--delay": `${0.4 + i * 0.7}s` })}
                  >
                    ✓
                  </span>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Layer>

      <Layer depth={24} className="bottom-[22%] left-[20%] w-[50%]" float={{ d: 6.5, delay: 0.7, r: 2 }}>
        <div className={`${card} p-3 sm:p-4`}>
          <div className="mb-2 flex justify-between text-[9px] sm:text-xs">
            <span className="font-semibold">Building…</span>
            <span className="text-muted">weekly demos</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#e5e7eb] sm:h-3">
            <span className="fill block h-full rounded-full bg-gradient-to-r from-[#4361ee] to-[#7c3aed]" />
          </div>
        </div>
      </Layer>

      <Layer depth={34} className="top-[16%] right-[10%] w-[14%]" float={false}>
        <div className="rise">
          <Rocket />
        </div>
      </Layer>
      <Layer depth={28} className="right-[6%] bottom-[8%] w-[16%]" float={false}>
        <Gear color="#10b981" />
      </Layer>
      <Layer depth={22} className="top-[4%] left-[44%]" float={{ d: 5.5, delay: 0.9, r: 4 }}>
        <Badge>Quote in 24h</Badge>
      </Layer>
      <Layer depth={20} className="top-[58%] right-[4%]" float={{ d: 5, delay: 1.4, r: 0 }}>
        <Bubble>💼</Bubble>
      </Layer>
      <Layer depth={12} className="bottom-[10%] left-[44%] w-[5%]" float={false}>
        <Sparkle color="#4cc9f0" delay={0.5} />
      </Layer>
    </Scene>
  );
}
