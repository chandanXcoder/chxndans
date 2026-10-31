import Image from "next/image";
import { site } from "@/lib/content";
import Scene from "./Scene";
import Layer from "./Layer";
import { Badge, Blob, Bubble, Mic, Sparkle, card, noodles, vars } from "./parts";

// GitHub-style contribution grid; squares light up in a diagonal wave.
function Contributions() {
  const greens = ["bg-[#9be9a8]", "bg-[#40c463]", "bg-[#30a14e]", "bg-[#216e39]"];
  return (
    <div className={`${card} p-3`}>
      <p className="mb-2 text-[9px] font-semibold text-muted sm:text-xs">1200+ contributions</p>
      <div className="grid grid-cols-10 gap-[3px]">
        {Array.from({ length: 50 }, (_, i) => {
          const row = Math.floor(i / 10);
          const col = i % 10;
          return (
            <span
              key={i}
              className={`glow aspect-square rounded-[2px] ${greens[(row * 3 + col * 7) % 4]}`}
              style={vars({ "--delay": `${(row + col) * 0.12}s`, "--d": "2.8s" })}
            />
          );
        })}
      </div>
    </div>
  );
}

function Cap() {
  return (
    <svg viewBox="0 0 120 90" className="w-full drop-shadow-[0_16px_20px_rgba(15,23,42,0.35)]" aria-hidden>
      <path d="M60 6 116 30 60 54 4 30z" fill="#1f2937" />
      <path d="M28 42v20c0 10 64 10 64 0V42L60 56z" fill="#374151" />
      <path d="M100 34v28" stroke="#fcc419" strokeWidth="3" />
      <circle cx="100" cy="66" r="5" fill="#fcc419" />
    </svg>
  );
}

export default function AboutScene({ className }: { className?: string }) {
  return (
    <Scene label="Illustration of a student developer ID card, graduation cap, microphone and contribution grid" className={className}>
      <Layer depth={8} className="top-[8%] left-[44%] w-[20%]" float={{ d: 7, delay: 0.3, r: -10 }}>
        <Blob from="#ff8fab" to="#e5383b" d={noodles.arc} />
      </Layer>
      <Layer depth={10} className="right-[6%] bottom-[14%] w-[16%]" float={{ d: 8, delay: 1, r: 0 }}>
        <Blob from="#b388ff" to="#7c3aed" d={noodles.ring} />
      </Layer>

      {/* ID card */}
      <Layer depth={14} className="top-[22%] left-[22%] w-[50%]" float={{ d: 7, delay: 0, r: -4 }}>
        <div className={`${card} overflow-hidden`}>
          <div className="h-8 bg-gradient-to-r from-[#4361ee] to-[#7c3aed] sm:h-12" />
          <div className="-mt-6 flex flex-col items-center px-4 pb-4 sm:-mt-9">
            <Image
              src={site.avatar}
              alt=""
              width={96}
              height={96}
              className="h-12 w-12 rounded-full object-cover ring-4 ring-white sm:h-20 sm:w-20"
            />
            <p className="mt-2 font-display text-xs font-semibold sm:text-lg">{site.fullName}</p>
            <p className="text-[8px] text-muted sm:text-xs">B.Tech CSE · Invertis University</p>
            <div className="mt-3 flex h-4 w-3/4 gap-[2px] sm:h-6">
              {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2].map((w, i) => (
                <span key={i} className="bg-fg/80" style={{ flex: w }} />
              ))}
            </div>
          </div>
        </div>
      </Layer>

      <Layer depth={30} className="top-[6%] left-[4%] w-[26%]" float={{ d: 6, delay: 0.6, r: -8 }}>
        <Cap />
      </Layer>

      <Layer depth={26} className="top-[18%] right-[4%] w-[12%]" float={{ d: 6.5, delay: 1.2, r: 10 }}>
        <Mic />
        <span className="absolute -top-2 -right-4 rounded-md bg-[#e62b1e] px-1.5 py-0.5 text-[8px] font-bold text-white sm:text-xs">
          TEDx
        </span>
      </Layer>

      <Layer depth={32} className="bottom-[6%] left-[4%] w-[44%]" float={{ d: 7.5, delay: 0.4, r: 2 }}>
        <Contributions />
      </Layer>

      <Layer depth={22} className="right-[14%] bottom-[30%]" float={{ d: 5.5, delay: 0.8, r: -4 }}>
        <Badge>Full-stack dev</Badge>
      </Layer>
      <Layer depth={24} className="top-[52%] left-[2%]" float={{ d: 5, delay: 1.5, r: 0 }}>
        <Bubble size="sm">💻</Bubble>
      </Layer>
      <Layer depth={18} className="top-[4%] right-[30%]" float={{ d: 5.8, delay: 0.2, r: 0 }}>
        <Bubble>📚</Bubble>
      </Layer>
      <Layer depth={12} className="right-[40%] bottom-[8%] w-[6%]" float={false}>
        <Sparkle delay={0.4} />
      </Layer>
      <Layer depth={12} className="top-[44%] right-[6%] w-[5%]" float={false}>
        <Sparkle color="#4cc9f0" delay={1.1} />
      </Layer>
    </Scene>
  );
}
