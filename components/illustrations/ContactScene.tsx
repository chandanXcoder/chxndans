import Scene from "./Scene";
import Layer from "./Layer";
import PaperPlane from "./PaperPlane";
import { Badge, Blob, Bubble, Phone, Sparkle, card, noodles, vars } from "./parts";

export function Envelope() {
  return (
    <svg viewBox="0 0 160 110" className="w-full drop-shadow-[0_22px_30px_rgba(67,97,238,0.28)]" aria-hidden>
      <defs>
        <linearGradient id="ct-env" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e3e9f5" />
        </linearGradient>
      </defs>
      <rect x="4" y="10" width="152" height="96" rx="12" fill="url(#ct-env)" />
      <path d="M8 16 80 66l72-50" fill="none" stroke="#c5d0e6" strokeWidth="4" />
      <path d="M4 22a12 12 0 0 1 12-12h128a12 12 0 0 1 12 12L80 62z" fill="#4361ee" />
      <circle cx="80" cy="58" r="12" fill="#ef476f" />
      <path d="M74 57a4 4 0 0 1 6-4 4 4 0 0 1 6 4c0 4-6 7-6 7s-6-3-6-7z" fill="white" />
    </svg>
  );
}

export default function ContactScene({ className }: { className?: string }) {
  return (
    <Scene label="Illustration of an envelope, a flying paper plane, chat bubbles and a ringing phone" className={className}>
      <Layer depth={6} className="bottom-[4%] left-[30%] w-[18%]" float={{ d: 8, delay: 0.6, r: 0 }}>
        <Blob from="#b388ff" to="#7c3aed" d={noodles.ring} />
      </Layer>
      <Layer depth={10} className="top-[4%] left-[2%] w-[92%]" float={false}>
        <PaperPlane />
      </Layer>
      <Layer depth={16} className="top-[34%] left-[22%] w-[48%]" float={{ d: 7, delay: 0, r: -4 }}>
        <Envelope />
      </Layer>

      {/* chat bubbles pop in turn */}
      <Layer depth={28} className="top-[24%] right-[2%]" float={false}>
        <div className="pop" style={vars({ "--d": "6s", "--delay": "0s" })}>
          <span className={`${card} inline-block rounded-br-sm px-3 py-2 text-[10px] whitespace-nowrap sm:text-sm`}>Hi Chandan 👋</span>
        </div>
      </Layer>
      <Layer depth={30} className="top-[64%] left-[2%]" float={false}>
        <div className="pop" style={vars({ "--d": "6s", "--delay": "1.5s" })}>
          <span className="inline-block rounded-2xl rounded-bl-sm bg-[#4361ee] px-3 py-2 text-[10px] whitespace-nowrap text-white shadow-[0_14px_28px_-10px_rgba(67,97,238,0.6)] sm:text-sm">
            Let&apos;s build it!
          </span>
        </div>
      </Layer>
      <Layer depth={26} className="top-[78%] left-[18%]" float={{ d: 5, delay: 0.4, r: 0 }}>
        <span className={`${card} inline-flex gap-1 px-3 py-2.5`}>
          {[0, 0.2, 0.4].map((d) => (
            <span key={d} className="glow h-1.5 w-1.5 rounded-full bg-fg/60 sm:h-2 sm:w-2" style={vars({ "--delay": `${d}s`, "--d": "1s" })} />
          ))}
        </span>
      </Layer>

      <Layer depth={34} className="right-[8%] bottom-[6%] w-[16%]" float={{ d: 6.5, delay: 1, r: 8 }}>
        <div className="wiggle">
          <Phone>
            <div className="grid h-full place-items-center">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-sm text-white sm:h-10 sm:w-10 sm:text-lg">📞</span>
            </div>
          </Phone>
        </div>
      </Layer>
      <Layer depth={22} className="top-[6%] right-[12%]" float={{ d: 5.5, delay: 0.8, r: 4 }}>
        <Badge>Reply in 24h</Badge>
      </Layer>
      <Layer depth={20} className="top-[20%] left-[6%]" float={{ d: 6, delay: 1.3, r: 0 }}>
        <Bubble size="sm">💬</Bubble>
      </Layer>
      <Layer depth={12} className="right-[30%] bottom-[22%] w-[5%]" float={false}>
        <Sparkle color="#4cc9f0" delay={0.9} />
      </Layer>
    </Scene>
  );
}
