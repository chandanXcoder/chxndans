import Scene from "./Scene";
import Layer from "./Layer";
import { Badge, Blob, Cloud, Gear, Rocket, Sparkle, card, noodles } from "./parts";

// Product stack (UI / API / DB) as floating cards, turning gears and a launching rocket.
const stack = [
  { name: "UI", tech: "Next.js · Flutter", color: "from-[#4361ee] to-[#7c3aed]", pos: "top-[20%] left-[24%]", depth: 22, delay: 0 },
  { name: "API", tech: "Node.js · Express", color: "from-[#10b981] to-[#059669]", pos: "top-[40%] left-[28%]", depth: 16, delay: 0.5 },
  { name: "DB", tech: "MongoDB · Firebase", color: "from-[#f59f00] to-[#e8590c]", pos: "top-[60%] left-[32%]", depth: 10, delay: 1 },
];

export default function ServicesScene({ className }: { className?: string }) {
  return (
    <Scene label="Illustration of a product stack with turning gears and a launching rocket" className={className} glow="from-[#dcfce7] to-[#eef2ff]">
      <Layer depth={6} className="top-[6%] left-[8%] w-[20%]" float={{ d: 7, delay: 0.3, r: -12 }}>
        <Blob from="#ff8fab" to="#e5383b" d={noodles.arc} />
      </Layer>
      {stack.map((s) => (
        <Layer key={s.name} depth={s.depth} className={`${s.pos} w-[46%]`} float={{ d: 6.5, delay: s.delay, r: -3 }}>
          <div className={`${card} flex items-center gap-3 p-3 sm:p-4`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-[10px] font-bold text-white sm:h-12 sm:w-12 sm:text-sm ${s.color}`}>
              {s.name}
            </span>
            <span className="min-w-0">
              <span className="block h-1.5 w-16 rounded-full bg-[#e5e7eb] sm:h-2 sm:w-24" />
              <span className="mt-1.5 block truncate text-[9px] text-muted sm:text-xs">{s.tech}</span>
            </span>
          </div>
        </Layer>
      ))}

      <Layer depth={30} className="top-[8%] right-[8%] w-[20%]" float={false}>
        <Gear />
      </Layer>
      <Layer depth={30} className="top-[26%] right-[4%] w-[12%]" float={false}>
        <Gear color="#4cc9f0" reverse />
      </Layer>
      <Layer depth={36} className="right-[12%] bottom-[10%] w-[13%]" float={false}>
        <div className="rise">
          <Rocket />
        </div>
      </Layer>
      <Layer depth={26} className="bottom-[8%] left-[2%] w-[22%]" float={{ d: 7, delay: 1.2, r: 0 }}>
        <Cloud />
      </Layer>
      <Layer depth={20} className="top-[4%] left-[38%]" float={{ d: 5.5, delay: 0.7, r: 4 }}>
        <Badge>Built to scale</Badge>
      </Layer>
      <Layer depth={12} className="top-[50%] right-[4%] w-[5%]" float={false}>
        <Sparkle delay={0.6} />
      </Layer>
    </Scene>
  );
}
