import Scene from "./Scene";
import Layer from "./Layer";
import { Badge, Blob, Bubble, Mic, Sparkle, card, noodles, vars } from "./parts";

const steps = [
  { label: "Freelance projects", color: "bg-[#4361ee]" },
  { label: "I-Tech Club core", color: "bg-[#7c3aed]" },
  { label: "TEDx co-host", color: "bg-[#e62b1e]" },
  { label: "Invertia 2026", color: "bg-[#10b981]" },
];

export default function ExperienceScene({ className }: { className?: string }) {
  return (
    <Scene label="Illustration of a glowing career timeline with a microphone and badges" className={className} glow="from-[#e9e3ff] to-[#eef2ff]">
      <Layer depth={8} className="top-[10%] right-[18%] w-[20%]" float={{ d: 7, delay: 0.5, r: 12 }}>
        <Blob from="#fff3b0" to="#f4d35e" d={noodles.wave} />
      </Layer>

      {/* timeline card; dots pulse one after another */}
      <Layer depth={14} className="top-[18%] left-[20%] w-[52%]" float={{ d: 7, delay: 0, r: 2 }}>
        <div className={`${card} p-4 sm:p-6`}>
          <p className="mb-3 text-[9px] font-semibold tracking-wide text-muted uppercase sm:mb-5 sm:text-xs">Journey</p>
          <div className="relative space-y-3 sm:space-y-5">
            <span className="absolute top-1 bottom-1 left-[5px] w-[2px] bg-gradient-to-b from-[#4361ee] via-[#7c3aed] to-[#10b981] sm:left-[7px]" />
            {steps.map((s, i) => (
              <div key={s.label} className="relative flex items-center gap-3">
                <span className="relative grid h-3 w-3 shrink-0 place-items-center sm:h-4 sm:w-4">
                  <span
                    className={`glow absolute inset-[-5px] rounded-full ${s.color} opacity-30 blur-[3px]`}
                    style={vars({ "--delay": `${i * 0.6}s` })}
                  />
                  <span className={`h-full w-full rounded-full ${s.color} ring-2 ring-white`} />
                </span>
                <span className="text-[10px] font-medium whitespace-nowrap sm:text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Layer>

      <Layer depth={28} className="top-[8%] left-[4%] w-[11%]" float={{ d: 6, delay: 0.8, r: -12 }}>
        <Mic />
      </Layer>
      <Layer depth={30} className="right-[4%] bottom-[22%]" float={{ d: 6.5, delay: 0.3, r: 6 }}>
        <div className={`${card} flex items-center gap-2 px-3 py-2`}>
          <span className="text-base sm:text-2xl">🏅</span>
          <span className="text-[10px] font-semibold sm:text-sm">Core member</span>
        </div>
      </Layer>
      <Layer depth={24} className="bottom-[8%] left-[12%]" float={{ d: 7, delay: 1.1, r: -3 }}>
        <Badge>4+ campus events</Badge>
      </Layer>
      <Layer depth={20} className="top-[40%] right-[6%]" float={{ d: 5.5, delay: 0.5, r: 0 }}>
        <Bubble>🤝</Bubble>
      </Layer>
      <Layer depth={22} className="bottom-[34%] left-[4%]" float={{ d: 5, delay: 1.4, r: 0 }}>
        <Bubble size="sm">🎤</Bubble>
      </Layer>
      <Layer depth={12} className="top-[6%] left-[40%] w-[6%]" float={false}>
        <Sparkle delay={0.2} />
      </Layer>
      <Layer depth={12} className="right-[34%] bottom-[10%] w-[5%]" float={false}>
        <Sparkle color="#b388ff" delay={1} />
      </Layer>
    </Scene>
  );
}
