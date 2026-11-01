import Scene from "@/components/illustrations/Scene";
import Layer from "@/components/illustrations/Layer";
import PaperPlane from "@/components/illustrations/PaperPlane";
import { Envelope } from "@/components/illustrations/ContactScene";
import { Badge, Blob, Bubble, Phone, Sparkle, card, noodles, vars } from "@/components/illustrations/parts";

// Contact-style illustration for the admin: mail landing in the inbox, bookings popping in.
export default function AdminScene({
  messages,
  bookings,
  className = "aspect-square w-full max-w-[460px]",
}: {
  messages?: number;
  bookings?: number;
  className?: string;
}) {
  const msgLabel = messages === undefined ? "New message ✉️" : `${messages} new message${messages === 1 ? "" : "s"}`;
  const bookLabel = bookings === undefined ? "Call booked ✓" : `${bookings} pending booking${bookings === 1 ? "" : "s"}`;

  return (
    <Scene label="Illustration of an inbox: an envelope, a flying paper plane, notification bubbles and a phone" className={className}>
      <Layer depth={6} className="bottom-[4%] left-[30%] w-[18%]" float={{ d: 8, delay: 0.6, r: 0 }}>
        <Blob from="#b388ff" to="#7c3aed" d={noodles.ring} />
      </Layer>
      <Layer depth={10} className="top-[4%] left-[2%] w-[92%]" float={false}>
        <PaperPlane />
      </Layer>
      <Layer depth={16} className="top-[34%] left-[22%] w-[48%]" float={{ d: 7, delay: 0, r: -4 }}>
        <Envelope />
      </Layer>

      {/* notifications pop in turn */}
      <Layer depth={28} className="top-[24%] right-[2%]" float={false}>
        <div className="pop" style={vars({ "--d": "6s", "--delay": "0s" })}>
          <span className={`${card} inline-flex items-center gap-2 rounded-br-sm px-3 py-2 text-[10px] whitespace-nowrap sm:text-sm`}>
            <span className="h-2 w-2 rounded-full bg-[#4361ee]" />
            {msgLabel}
          </span>
        </div>
      </Layer>
      <Layer depth={30} className="top-[64%] left-[2%]" float={false}>
        <div className="pop" style={vars({ "--d": "6s", "--delay": "1.5s" })}>
          <span className="inline-block rounded-2xl rounded-bl-sm bg-[#4361ee] px-3 py-2 text-[10px] whitespace-nowrap text-white shadow-[0_14px_28px_-10px_rgba(67,97,238,0.6)] sm:text-sm">
            {bookLabel}
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
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-sm text-white sm:h-10 sm:w-10 sm:text-lg">📅</span>
            </div>
          </Phone>
        </div>
      </Layer>
      <Layer depth={22} className="top-[6%] right-[12%]" float={{ d: 5.5, delay: 0.8, r: 4 }}>
        <Badge>Inbox</Badge>
      </Layer>
      <Layer depth={20} className="top-[20%] left-[6%]" float={{ d: 6, delay: 1.3, r: 0 }}>
        <Bubble size="sm">📬</Bubble>
      </Layer>
      <Layer depth={12} className="right-[30%] bottom-[22%] w-[5%]" float={false}>
        <Sparkle color="#4cc9f0" delay={0.9} />
      </Layer>
    </Scene>
  );
}
