import Image from "next/image";
import { site } from "@/lib/content";
import Scene from "./Scene";
import Layer from "./Layer";
import { Badge, Blob, Bubble, Sparkle, card, noodles, vars } from "./parts";

// Calendar whose highlighted day hops along a week, a ticking clock and a video-call tile.
function Calendar() {
  return (
    <div className={`${card} overflow-hidden`}>
      <div className="flex items-center justify-between bg-[#ef476f] px-3 py-2 text-[10px] font-semibold text-white sm:text-sm">
        Pick a day
        <span className="opacity-70">IST</span>
      </div>
      <div className="p-2 sm:p-3">
        <div className="grid grid-cols-7 text-center text-[8px] text-muted sm:text-[11px]">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="relative mt-1 grid grid-cols-7 text-center text-[9px] sm:text-xs">
          {/* highlight hops Tue -> Wed -> Thu -> Fri in the second week */}
          <span className="pointer-events-none absolute top-[25%] left-[14.285%] h-[25%] w-[14.285%] p-[2px]">
            <span className="hop block h-full w-full rounded-md bg-[#4361ee]" style={vars({ "--step": "100%" })} />
          </span>
          {Array.from({ length: 28 }, (_, i) => (
            <span key={i} className={`relative py-1 ${i % 7 === 6 ? "text-fg/30" : ""}`}>
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Clock() {
  return (
    <div className="relative aspect-square rounded-full bg-white shadow-[0_18px_36px_-12px_rgba(30,41,59,0.35)] ring-[6px] ring-[#4361ee]">
      {[0, 90, 180, 270].map((r) => (
        <span key={r} className="absolute top-1/2 left-1/2 h-[42%] w-[3px]" style={{ transform: `translate(-50%, -100%) rotate(${r}deg)`, transformOrigin: "bottom center" }}>
          <span className="block h-[14%] w-full rounded-full bg-fg/30" />
        </span>
      ))}
      <span className="absolute bottom-1/2 left-1/2 h-[26%] w-[4px] -translate-x-1/2">
        <span className="hand block h-full w-full rounded-full bg-fg" style={vars({ "--d": "24s" })} />
      </span>
      <span className="absolute bottom-1/2 left-1/2 h-[36%] w-[3px] -translate-x-1/2">
        <span className="hand block h-full w-full rounded-full bg-[#ef476f]" style={vars({ "--d": "4s" })} />
      </span>
      <span className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg" />
    </div>
  );
}

export default function BookCallScene({ className }: { className?: string }) {
  return (
    <Scene label="Illustration of a calendar, a ticking clock and a video call" className={className} glow="from-[#ffe3ec] to-[#eef2ff]">
      <Layer depth={6} className="top-[6%] right-[30%] w-[18%]" float={{ d: 7, delay: 0.3, r: 8 }}>
        <Blob from="#fff3b0" to="#f4d35e" d={noodles.wave} />
      </Layer>
      <Layer depth={14} className="top-[18%] left-[8%] w-[50%]" float={{ d: 7, delay: 0, r: -3 }}>
        <Calendar />
      </Layer>
      <Layer depth={24} className="top-[10%] right-[6%] w-[24%]" float={{ d: 6, delay: 0.8, r: 0 }}>
        <Clock />
      </Layer>

      {/* video call tile */}
      <Layer depth={30} className="right-[4%] bottom-[8%] w-[46%]" float={{ d: 6.5, delay: 0.4, r: 3 }}>
        <div className="overflow-hidden rounded-2xl bg-[#14161b] p-2 shadow-[0_24px_48px_-16px_rgba(15,23,42,0.6)]">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image src={site.photo} alt="" fill sizes="280px" className="object-cover object-[50%_25%]" />
            <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[8px] text-white sm:text-[11px]">
              <span className="glow h-1.5 w-1.5 rounded-full bg-[#ef476f]" style={vars({ "--d": "1.4s" })} />
              30 min call
            </span>
            <span className="absolute right-2 bottom-2 aspect-[3/4] w-[24%] rounded-md bg-gradient-to-br from-[#4361ee] to-[#7c3aed] ring-2 ring-white/60" />
          </div>
          <div className="flex justify-center gap-2 pt-2">
            <span className="h-5 w-5 rounded-full bg-white/15 sm:h-7 sm:w-7" />
            <span className="h-5 w-5 rounded-full bg-white/15 sm:h-7 sm:w-7" />
            <span className="h-5 w-8 rounded-full bg-[#ef476f] sm:h-7 sm:w-11" />
          </div>
        </div>
      </Layer>

      <Layer depth={22} className="bottom-[16%] left-[6%]" float={{ d: 5.5, delay: 1.1, r: -4 }}>
        <Badge>Free · Mon–Sat</Badge>
      </Layer>
      <Layer depth={20} className="top-[54%] left-[2%]" float={{ d: 5, delay: 0.6, r: 0 }}>
        <Bubble size="sm">☕</Bubble>
      </Layer>
      <Layer depth={12} className="top-[44%] right-[40%] w-[5%]" float={false}>
        <Sparkle delay={0.4} />
      </Layer>
    </Scene>
  );
}
