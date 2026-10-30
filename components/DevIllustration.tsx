import Scene from "./illustrations/Scene";
import Layer from "./illustrations/Layer";
import { Atom, Blob, Cloud, Coffee, card, noodles } from "./illustrations/parts";

// Code typed out on the laptop screen; each token is [text, colour class].
const code: [string, string][][] = [
  [["const ", "text-[#c792ea]"], ["dev", "text-[#82aaff]"], [" = {", "text-white/80"]],
  [["  name: ", "text-white/80"], ['"Chandan"', "text-[#c3e88d]"], [",", "text-white/80"]],
  [["  stack: [", "text-white/80"], ['"Next.js"', "text-[#c3e88d]"], [", ", "text-white/80"], ['"Flutter"', "text-[#c3e88d]"], ["],", "text-white/80"]],
  [["  coffee: ", "text-white/80"], ["Infinity", "text-[#f78c6c]"], [",", "text-white/80"]],
  [["};", "text-white/80"]],
  [["ship", "text-[#82aaff]"], ["(dev); ", "text-white/80"], ["// live", "text-white/40"]],
];

// typing starts after the previous line finishes
let at = 0.3;
const lines = code.map((tokens) => {
  const n = tokens.reduce((sum, [t]) => sum + t.length, 0);
  const delay = at;
  at += n * 0.045 + 0.25;
  return { tokens, n, delay };
});

function Laptop() {
  return (
    <div className="[perspective:1400px]">
      <div className="[transform:rotateX(8deg)_rotateY(-14deg)] [transform-style:preserve-3d]">
        {/* screen */}
        <div className="rounded-[14px] bg-gradient-to-b from-[#3a3e48] to-[#23262d] p-[3.5%] shadow-[0_30px_60px_-20px_rgba(15,23,42,0.55)]">
          <div className="aspect-[16/10] overflow-hidden rounded-md bg-[#14161b]">
            <div className="flex items-center gap-1 border-b border-white/5 px-2.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[8px] text-white/40 sm:text-[9px]">dev.ts</span>
            </div>
            <div className="space-y-[3px] px-2.5 py-2 font-mono text-[8.5px] leading-[1.55] sm:text-[11px]">
              {lines.map((l, i) => (
                <div key={i} className="flex">
                  <span className="w-4 shrink-0 text-white/20 select-none">{i + 1}</span>
                  <span
                    className="type-line"
                    style={{ "--n": l.n, "--delay": `${l.delay}s` } as React.CSSProperties}
                  >
                    {l.tokens.map(([t, c], j) => (
                      <span key={j} className={`whitespace-pre ${c}`}>
                        {t}
                      </span>
                    ))}
                  </span>
                  {i === lines.length - 1 && <span className="caret ml-px inline-block w-[0.55em] bg-[#82aaff]" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* keyboard deck */}
        <div className="relative mx-[-7%] h-3 rounded-b-[18px] rounded-t-sm bg-gradient-to-b from-[#e7eaee] via-[#c9ced6] to-[#9aa1ac] shadow-[0_25px_40px_-12px_rgba(15,23,42,0.45)] sm:h-4">
          <div className="absolute top-0 left-1/2 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-[#aab0ba]" />
        </div>
      </div>
    </div>
  );
}

// Playful 3D-style "developer at work" scene: laptop with live-typing code and floating props.
export default function DevIllustration() {
  return (
    <Scene label="Illustration of a laptop with code being typed, surrounded by floating developer tools">
      <Layer depth={8} className="top-[12%] left-[30%] w-[22%]" float={{ d: 7, delay: 0.4, r: -12 }}>
        <Blob from="#ff8fab" to="#e5383b" d={noodles.arc} />
      </Layer>
      <Layer depth={10} className="top-[52%] right-[4%] w-[18%]" float={{ d: 8, delay: 1.2, r: 18 }}>
        <Blob from="#fff3b0" to="#f4d35e" d={noodles.wave} />
      </Layer>
      <Layer depth={12} className="bottom-[10%] left-[20%] w-[14%]" float={{ d: 6.5, delay: 0.8, r: 0 }}>
        <Blob from="#b388ff" to="#7c3aed" d={noodles.ring} />
      </Layer>

      {/* laptop */}
      <Layer depth={14} className="top-[30%] left-[15%] w-[66%]" float={{ d: 7, delay: 0, r: 0 }}>
        <Laptop />
      </Layer>

      {/* browser window with idea bulb */}
      <Layer depth={30} className="top-[13%] left-[1%] w-[30%]" float={{ d: 6, delay: 0.5, r: -6 }}>
        <div className={`${card} overflow-hidden`}>
          <div className="flex items-center gap-1 bg-[#4361ee] px-2 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          </div>
          <div className="grid place-items-center bg-gradient-to-b from-[#eef4ff] to-white py-3 text-2xl sm:py-4 sm:text-4xl">
            💡
          </div>
        </div>
      </Layer>

      <Layer depth={40} className="top-[3%] right-[3%] w-[28%]" float={{ d: 7.5, delay: 1, r: 0 }}>
        <Cloud />
      </Layer>

      <Layer depth={36} className="top-[44%] left-[0%] w-[15%]" float={{ d: 6, delay: 0.2, r: 0 }}>
        <Atom />
      </Layer>

      <Layer depth={28} className="top-[42%] right-[2%] w-[12%]" float={{ d: 5.5, delay: 0.9, r: 6 }}>
        <Coffee />
      </Layer>

      {/* phone with app UI */}
      <Layer depth={34} className="right-[9%] bottom-[5%] w-[17%]" float={{ d: 6.5, delay: 1.5, r: 8 }}>
        <div className="rounded-[14px] bg-[#1f2937] p-[6%] shadow-[0_20px_40px_-14px_rgba(15,23,42,0.5)]">
          <div className="aspect-[9/17] space-y-[8%] rounded-[10px] bg-white p-[10%]">
            <div className="h-[18%] rounded-md bg-gradient-to-r from-[#22c55e] to-[#16a34a]" />
            <div className="h-[9%] w-3/4 rounded bg-[#e5e7eb]" />
            <div className="h-[9%] rounded bg-[#e5e7eb]" />
            <div className="h-[9%] w-2/3 rounded bg-[#e5e7eb]" />
            <div className="h-[14%] rounded-md bg-[#dbeafe]" />
          </div>
        </div>
      </Layer>

      {/* terminal chip */}
      <Layer depth={24} className="bottom-[16%] left-[2%]" float={{ d: 7, delay: 0.7, r: -3 }}>
        <div className="inline-block rounded-xl bg-[#0d0e10] px-3 py-2 font-mono text-[9px] whitespace-nowrap text-white/80 shadow-[0_18px_36px_-12px_rgba(15,23,42,0.55)] sm:text-xs">
          <span className="text-[#28c840]">$</span> npm run build
          <br />
          <span className="text-[#28c840]">✓</span> <span className="text-white/60">Compiled successfully</span>
        </div>
      </Layer>

      {/* tech badges + emoji bubbles */}
      <Layer depth={20} className="top-[4%] left-[40%]" float={{ d: 5.5, delay: 0.3, r: 4 }}>
        <span className={`${card} inline-block px-3 py-1.5 text-[10px] font-semibold sm:text-sm`}>Next.js</span>
      </Layer>
      <Layer depth={22} className="right-[30%] bottom-[2%]" float={{ d: 6, delay: 1.1, r: -4 }}>
        <span className="inline-block rounded-2xl bg-gradient-to-r from-[#42a5f5] to-[#1565c0] px-3 py-1.5 text-[10px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(21,101,192,0.6)] sm:text-sm">
          Flutter
        </span>
      </Layer>
      <Layer depth={26} className="top-[26%] right-[30%]" float={{ d: 5, delay: 0.6, r: 0 }}>
        <span className={`${card} grid h-9 w-9 place-items-center !rounded-full text-base sm:h-12 sm:w-12 sm:text-2xl`}>🚀</span>
      </Layer>
      <Layer depth={18} className="top-[33%] left-[8%]" float={{ d: 5.8, delay: 1.4, r: 0 }}>
        <span className={`${card} grid h-8 w-8 place-items-center !rounded-full text-sm sm:h-10 sm:w-10 sm:text-xl`}>😎</span>
      </Layer>
      <Layer depth={16} className="right-[24%] bottom-[30%]" float={{ d: 6.2, delay: 0.1, r: 0 }}>
        <span className="inline-block rounded-lg bg-[#7c3aed] px-2 py-1 font-mono text-[10px] font-bold text-white shadow-[0_12px_24px_-8px_rgba(124,58,237,0.6)] sm:text-sm">
          {"</>"}
        </span>
      </Layer>
    </Scene>
  );
}
