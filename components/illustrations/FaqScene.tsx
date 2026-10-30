import Scene from "./Scene";
import Layer from "./Layer";
import { Bulb, Sparkle, card, vars } from "./parts";

// Question and answer bubbles popping around a glowing idea bulb.
export default function FaqScene({ className }: { className?: string }) {
  return (
    <Scene label="Illustration of question and answer bubbles around a glowing light bulb" className={className} glow="from-[#f3e8ff] to-[#eef2ff]">
      <Layer depth={14} className="top-[26%] left-[36%] w-[28%]" float={{ d: 7, delay: 0, r: 0 }}>
        <Bulb />
      </Layer>
      <Layer depth={28} className="top-[8%] left-[6%] w-[26%]" float={{ d: 6, delay: 0.4, r: -8 }}>
        <div className="grid aspect-square place-items-center rounded-[30%] bg-gradient-to-br from-[#b388ff] to-[#7c3aed] font-display text-4xl font-bold text-white shadow-[0_24px_44px_-14px_rgba(124,58,237,0.6)] sm:text-7xl">
          ?
        </div>
      </Layer>
      <Layer depth={24} className="right-[8%] bottom-[12%] w-[18%]" float={{ d: 6.5, delay: 1, r: 8 }}>
        <div className="grid aspect-square place-items-center rounded-[30%] bg-gradient-to-br from-[#ffe066] to-[#f59f00] font-display text-3xl font-bold text-white shadow-[0_20px_40px_-14px_rgba(245,159,0,0.6)] sm:text-6xl">
          !
        </div>
      </Layer>
      <Layer depth={30} className="top-[12%] right-[4%]" float={false}>
        <div className="pop" style={vars({ "--d": "5s", "--delay": "0s" })}>
          <span className={`${card} inline-block rounded-bl-sm px-3 py-2 text-[10px] whitespace-nowrap sm:text-sm`}>How long does it take?</span>
        </div>
      </Layer>
      <Layer depth={32} className="bottom-[26%] left-[2%]" float={false}>
        <div className="pop" style={vars({ "--d": "5s", "--delay": "1.6s" })}>
          <span className="inline-block rounded-2xl rounded-br-sm bg-[#4361ee] px-3 py-2 text-[10px] whitespace-nowrap text-white shadow-[0_14px_28px_-10px_rgba(67,97,238,0.6)] sm:text-sm">
            Usually 2–4 weeks ✓
          </span>
        </div>
      </Layer>
      <Layer depth={26} className="bottom-[6%] left-[30%]" float={false}>
        <div className="pop" style={vars({ "--d": "5s", "--delay": "3s" })}>
          <span className={`${card} inline-block px-3 py-2 text-[10px] whitespace-nowrap sm:text-sm`}>Do you do apps? 📱</span>
        </div>
      </Layer>
      {[
        ["top-[20%] right-[34%] w-[6%]", "#ffd166", 0.2],
        ["top-[60%] left-[22%] w-[5%]", "#b388ff", 0.9],
        ["bottom-[40%] right-[4%] w-[4%]", "#4cc9f0", 1.5],
      ].map(([pos, color, delay]) => (
        <Layer key={pos as string} depth={12} className={pos as string} float={false}>
          <Sparkle color={color as string} delay={delay as number} />
        </Layer>
      ))}
    </Scene>
  );
}
