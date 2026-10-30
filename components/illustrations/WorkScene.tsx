import Image from "next/image";
import { projects } from "@/lib/content";
import Scene from "./Scene";
import Layer from "./Layer";
import { Blob, Browser, Bubble, Cursor, Sparkle, card, noodles, vars } from "./parts";

// Project screenshots fanned out as floating browser windows; a cursor glides over and "clicks" Live.
const fan = [
  { pos: "top-[10%] left-[2%] w-[56%]", depth: 10, float: { d: 8, delay: 0.6, r: -8 }, bar: "bg-[#1f2937]" },
  { pos: "top-[20%] right-[2%] w-[56%]", depth: 16, float: { d: 7, delay: 1.2, r: 7 }, bar: "bg-[#7c3aed]" },
  { pos: "top-[36%] left-[18%] w-[60%]", depth: 24, float: { d: 6.5, delay: 0, r: -1 }, bar: "bg-[#4361ee]" },
];

export default function WorkScene({ className }: { className?: string }) {
  const shots = projects.filter((p) => p.image).slice(0, 3);
  return (
    <Scene label="Illustration of project websites floating as browser windows with a cursor clicking" className={className}>
      <Layer depth={6} className="right-[10%] bottom-[6%] w-[20%]" float={{ d: 8, delay: 0.4, r: 10 }}>
        <Blob from="#fff3b0" to="#f4d35e" d={noodles.wave} />
      </Layer>
      {shots.map((p, i) => (
        <Layer key={p.slug} depth={fan[i].depth} className={fan[i].pos} float={fan[i].float}>
          <Browser bar={fan[i].bar}>
            <div className="relative aspect-[16/9] bg-[#14161b]">
              <Image src={p.image!} alt="" fill sizes="340px" className="object-cover object-top" />
            </div>
          </Browser>
        </Layer>
      ))}

      {/* Live button + cursor that glides onto it */}
      <Layer depth={34} className="bottom-[16%] left-[46%]" float={false}>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[10px] font-semibold text-white shadow-[0_14px_28px_-10px_rgba(16,185,129,0.7)] sm:text-sm">
          <span className="glow h-1.5 w-1.5 rounded-full bg-white" style={vars({ "--d": "1.2s" })} />
          Live
        </span>
      </Layer>
      <Layer depth={38} className="bottom-[2%] left-[30%] w-[6%]" float={false}>
        <div className="glide" style={vars({ "--gx": "260%", "--gy": "-170%" })}>
          <Cursor />
        </div>
      </Layer>

      <Layer depth={30} className="right-[6%] bottom-[24%]" float={{ d: 6, delay: 0.9, r: 4 }}>
        <span className={`${card} inline-block px-3 py-1.5 text-[10px] whitespace-nowrap text-[#f59f00] sm:text-sm`}>★★★★★</span>
      </Layer>
      <Layer depth={26} className="bottom-[22%] left-[4%]" float={{ d: 5.5, delay: 0.3, r: 0 }}>
        <Bubble>🚀</Bubble>
      </Layer>
      <Layer depth={12} className="top-[4%] right-[24%] w-[6%]" float={false}>
        <Sparkle delay={0.5} />
      </Layer>
    </Scene>
  );
}
