import Scene from "./Scene";
import Layer from "./Layer";
import { Blob, Bubble, Flame, Sparkle, Trophy, card, noodles } from "./parts";

function Medal() {
  return (
    <div className="swing flex flex-col items-center">
      <svg viewBox="0 0 60 50" className="w-[70%]" aria-hidden>
        <path d="M10 0h14l10 50H20zM50 0H36L26 50h14z" fill="#4361ee" />
        <path d="M24 0h12l-6 30z" fill="#ef476f" />
      </svg>
      <div className="-mt-1 grid aspect-square w-full place-items-center rounded-full bg-gradient-to-br from-[#fff3bf] via-[#fcc419] to-[#e67700] text-[10px] font-bold text-[#7c4a03] shadow-[0_12px_24px_-8px_rgba(230,119,0,0.6)] ring-4 ring-[#ffe8a3] sm:text-base">
        #1
      </div>
    </div>
  );
}

export default function AchievementsScene({ className }: { className?: string }) {
  return (
    <Scene label="Illustration of a trophy, a streak flame, a swinging medal and sparkles" className={className} glow="from-[#fff3d6] to-[#fff9ec]">
      <Layer depth={8} className="top-[12%] left-[16%] w-[20%]" float={{ d: 7, delay: 0.3, r: -12 }}>
        <Blob from="#ff8fab" to="#e5383b" d={noodles.arc} />
      </Layer>
      <Layer depth={10} className="right-[8%] bottom-[10%] w-[18%]" float={{ d: 8, delay: 1, r: 12 }}>
        <Blob from="#b388ff" to="#7c3aed" d={noodles.wave} />
      </Layer>

      <Layer depth={16} className="top-[24%] left-[30%] w-[38%]" float={{ d: 7, delay: 0, r: 0 }}>
        <Trophy />
      </Layer>

      {/* streak card */}
      <Layer depth={30} className="bottom-[8%] left-[4%] w-[30%]" float={{ d: 6, delay: 0.5, r: -4 }}>
        <div className={`${card} flex items-center gap-2 p-3`}>
          <span className="w-[34%] shrink-0">
            <Flame />
          </span>
          <span>
            <span className="block font-display text-lg leading-none font-semibold sm:text-3xl">99</span>
            <span className="block text-[8px] text-muted uppercase sm:text-[11px]">day streak</span>
          </span>
        </div>
      </Layer>

      <Layer depth={26} className="top-[2%] right-[10%] w-[14%]" float={false}>
        <Medal />
      </Layer>

      <Layer depth={24} className="top-[16%] left-[2%]" float={{ d: 5.5, delay: 0.9, r: -6 }}>
        <div className="rounded-xl bg-[#0d0e10] px-3 py-2 text-white shadow-[0_16px_30px_-10px_rgba(0,0,0,0.5)]">
          <span className="block font-display text-sm font-semibold sm:text-2xl">Top 6</span>
          <span className="block text-[8px] text-white/60 sm:text-[11px]">Hack Bhoomi</span>
        </div>
      </Layer>
      <Layer depth={28} className="right-[4%] bottom-[34%]" float={{ d: 6.5, delay: 1.3, r: 4 }}>
        <div className="rounded-xl bg-violet-500 px-3 py-2 text-white shadow-[0_16px_30px_-10px_rgba(124,58,237,0.6)]">
          <span className="block font-display text-sm font-semibold sm:text-2xl">800+</span>
          <span className="block text-[8px] text-white/70 sm:text-[11px]">contributions</span>
        </div>
      </Layer>
      <Layer depth={20} className="right-[34%] bottom-[6%]" float={{ d: 5, delay: 0.2, r: 0 }}>
        <Bubble>🎉</Bubble>
      </Layer>

      {[
        ["top-[20%] right-[34%] w-[6%]", "#ffd166", 0],
        ["top-[50%] left-[18%] w-[5%]", "#4cc9f0", 0.7],
        ["top-[8%] left-[40%] w-[4%]", "#ff6b9a", 1.3],
        ["bottom-[30%] right-[30%] w-[5%]", "#ffd166", 1.8],
      ].map(([pos, color, delay]) => (
        <Layer key={pos as string} depth={12} className={pos as string} float={false}>
          <Sparkle color={color as string} delay={delay as number} />
        </Layer>
      ))}
    </Scene>
  );
}
