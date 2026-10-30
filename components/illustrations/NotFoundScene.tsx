import Scene from "./Scene";
import Layer from "./Layer";
import { Blob, Cloud, Sparkle, noodles } from "./parts";

// Unplugged cable wiggling next to its socket, a bouncing map pin and a big 404.
export default function NotFoundScene({ className }: { className?: string }) {
  return (
    <Scene label="Illustration of an unplugged cable, a map pin and the number 404" className={className} glow="from-[#ffe3e3] to-[#eef2ff]">
      <Layer depth={10} className="top-[14%] left-[14%] w-[72%]" float={{ d: 8, delay: 0, r: 0 }}>
        <p className="bg-gradient-to-br from-[#4361ee] via-[#7c3aed] to-[#ef476f] bg-clip-text text-center font-display text-[5rem] leading-none font-bold tracking-tight text-transparent sm:text-[9rem]">
          404
        </p>
      </Layer>

      {/* socket + plug */}
      <Layer depth={20} className="top-[58%] left-[4%] w-[92%]" float={false}>
        <svg viewBox="0 0 320 80" className="w-full overflow-visible drop-shadow-[0_16px_20px_rgba(15,23,42,0.25)]" aria-hidden>
          <path d="M0 60 C 60 60, 70 20, 130 30" fill="none" stroke="#0d0e10" strokeWidth="6" strokeLinecap="round" />
          <g className="wiggle" style={{ transformOrigin: "130px 30px", transformBox: "view-box" }}>
            <rect x="126" y="16" width="34" height="28" rx="6" fill="#0d0e10" />
            <rect x="160" y="21" width="12" height="5" rx="2" fill="#adb5bd" />
            <rect x="160" y="34" width="12" height="5" rx="2" fill="#adb5bd" />
          </g>
          <rect x="230" y="6" width="70" height="56" rx="14" fill="#f1f3f5" stroke="#dee2e6" strokeWidth="3" />
          <rect x="250" y="24" width="8" height="18" rx="3" fill="#495057" />
          <rect x="272" y="24" width="8" height="18" rx="3" fill="#495057" />
          <text x="196" y="18" fontSize="14" fill="#ef476f">⚡</text>
        </svg>
      </Layer>

      <Layer depth={30} className="top-[4%] right-[6%] w-[12%]" float={{ d: 3, delay: 0, r: 0 }}>
        <svg viewBox="0 0 40 56" className="w-full drop-shadow-[0_12px_14px_rgba(239,71,111,0.4)]" aria-hidden>
          <path d="M20 2a18 18 0 0 0-18 18c0 14 18 34 18 34s18-20 18-34A18 18 0 0 0 20 2z" fill="#ef476f" />
          <circle cx="20" cy="20" r="7" fill="white" />
        </svg>
      </Layer>
      <Layer depth={24} className="bottom-[6%] left-[8%] w-[24%]" float={{ d: 7, delay: 0.8, r: 0 }}>
        <Cloud />
      </Layer>
      <Layer depth={8} className="right-[10%] bottom-[4%] w-[18%]" float={{ d: 8, delay: 0.4, r: 10 }}>
        <Blob from="#b388ff" to="#7c3aed" d={noodles.ring} />
      </Layer>
      <Layer depth={12} className="top-[10%] left-[8%] w-[6%]" float={false}>
        <Sparkle delay={0.3} />
      </Layer>
    </Scene>
  );
}
