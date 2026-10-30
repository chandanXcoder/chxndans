// Reusable 3D-style props for the illustrations (pure markup, no hooks).

export const card = "rounded-2xl bg-white shadow-[0_18px_40px_-14px_rgba(30,41,59,0.3)] ring-1 ring-black/5";

const vars = (v: Record<string, string | number>) => v as React.CSSProperties;

export function Cloud() {
  return (
    <svg viewBox="0 0 160 120" className="w-full drop-shadow-[0_18px_24px_rgba(30,64,175,0.18)]" aria-hidden>
      <defs>
        <linearGradient id="pt-cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef5ff" />
          <stop offset="1" stopColor="#b9d0f2" />
        </linearGradient>
        <linearGradient id="pt-bolt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe066" />
          <stop offset="1" stopColor="#ff9f1c" />
        </linearGradient>
      </defs>
      <path
        d="M42 86c-16 0-28-11-28-25s12-25 27-25c4-15 18-26 35-26 18 0 33 12 36 28 14 1 25 12 25 24 0 14-12 24-27 24z"
        fill="url(#pt-cloud)"
      />
      <path d="M86 64 70 92h13l-8 24 24-34H86l9-18z" fill="url(#pt-bolt)" />
      <circle cx="22" cy="20" r="4" fill="#ff6b9a" />
      <circle cx="140" cy="18" r="3.5" fill="#4cc9f0" />
      <rect x="128" y="96" width="7" height="7" rx="1.5" fill="#7c5cff" transform="rotate(20 131 99)" />
    </svg>
  );
}

export function Atom() {
  return (
    <svg viewBox="0 0 100 100" className="spin-slow w-full drop-shadow-[0_10px_16px_rgba(97,218,251,0.45)]" aria-hidden>
      {[0, 60, 120].map((r) => (
        <ellipse
          key={r}
          cx="50"
          cy="50"
          rx="44"
          ry="17"
          fill="none"
          stroke="#61dafb"
          strokeWidth="5"
          transform={`rotate(${r} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="8" fill="#61dafb" />
    </svg>
  );
}

export function Coffee() {
  return (
    <div className="relative">
      <div className="absolute -top-6 left-1/2 flex -translate-x-1/2 gap-1.5">
        {[0, 0.6, 1.2].map((d) => (
          <span key={d} className="steam block h-4 w-1 rounded-full bg-[#9aa1ac]/60" style={vars({ "--delay": `${d}s` })} />
        ))}
      </div>
      <svg viewBox="0 0 70 96" className="w-full drop-shadow-[0_14px_18px_rgba(87,52,24,0.25)]" aria-hidden>
        <defs>
          <linearGradient id="pt-cup" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#e4e7eb" />
          </linearGradient>
        </defs>
        <rect x="4" y="6" width="62" height="14" rx="5" fill="#6b4226" />
        <path d="M9 20h52l-6 70a6 6 0 0 1-6 5H21a6 6 0 0 1-6-5z" fill="url(#pt-cup)" />
        <path d="M12 42h46l-2.4 26H14.4z" fill="#b7835a" />
        <circle cx="35" cy="55" r="7" fill="#f5e6d3" />
      </svg>
    </div>
  );
}

// Thick gradient stroke ("noodle") shape.
export function Blob({ from, to, d, className = "w-full" }: { from: string; to: string; d: string; className?: string }) {
  const id = `pt-${from.slice(1)}-${to.slice(1)}`;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke={`url(#${id})`} strokeWidth="18" strokeLinecap="round" />
    </svg>
  );
}

export const noodles = {
  arc: "M15 80 C 15 30, 60 10, 85 25",
  wave: "M15 50 C 40 30, 60 70, 85 50",
  ring: "M50 15 A 35 35 0 1 1 49.9 15",
};

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`${card} inline-block px-3 py-1.5 text-[10px] font-semibold whitespace-nowrap sm:text-sm ${className}`}>
      {children}
    </span>
  );
}

export function Bubble({ children, size = "md" }: { children: React.ReactNode; size?: "sm" | "md" }) {
  const s = size === "sm" ? "h-8 w-8 text-sm sm:h-10 sm:w-10 sm:text-xl" : "h-9 w-9 text-base sm:h-12 sm:w-12 sm:text-2xl";
  return <span className={`${card} grid place-items-center !rounded-full ${s}`}>{children}</span>;
}

export function Browser({ bar = "bg-[#4361ee]", children }: { bar?: string; children: React.ReactNode }) {
  return (
    <div className={`${card} overflow-hidden`}>
      <div className={`flex items-center gap-1 px-2 py-1.5 ${bar}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
      </div>
      {children}
    </div>
  );
}

export function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] bg-[#1f2937] p-[6%] shadow-[0_20px_40px_-14px_rgba(15,23,42,0.5)]">
      <div className="aspect-[9/17] overflow-hidden rounded-[10px] bg-white p-[10%]">{children}</div>
    </div>
  );
}

export function Gear({ color = "#7c3aed", reverse = false }: { color?: string; reverse?: boolean }) {
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="0 0 100 100" className={`w-full ${reverse ? "spin-rev" : "spin-slow"}`} aria-hidden>
      {teeth.map((r) => (
        <rect key={r} x="43" y="4" width="14" height="20" rx="4" fill={color} transform={`rotate(${r} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="32" fill={color} />
      <circle cx="50" cy="50" r="12" fill="white" />
    </svg>
  );
}

export function Sparkle({ color = "#ffd166", delay = 0 }: { color?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 24 24" className="twinkle w-full" style={vars({ "--delay": `${delay}s` })} aria-hidden>
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" fill={color} />
    </svg>
  );
}

// Grey placeholder text bar for mock UIs.
export function Bar({ className = "" }: { className?: string }) {
  return <div className={`h-1.5 rounded-full bg-[#e5e7eb] sm:h-2 ${className}`} />;
}

export { vars };

export function Rocket() {
  return (
    <div className="relative">
      <svg viewBox="0 0 80 120" className="w-full drop-shadow-[0_16px_20px_rgba(67,97,238,0.35)]" aria-hidden>
        <defs>
          <linearGradient id="pt-rocket" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#d7dde8" />
          </linearGradient>
        </defs>
        <path d="M40 4c18 14 24 38 20 70H20C16 42 22 18 40 4z" fill="url(#pt-rocket)" />
        <circle cx="40" cy="42" r="10" fill="#4361ee" stroke="#c7d2fe" strokeWidth="4" />
        <path d="M20 58 6 78l14-4zM60 58l14 20-14-4z" fill="#ef476f" />
        <rect x="30" y="74" width="20" height="8" rx="3" fill="#8d99ae" />
      </svg>
      <svg viewBox="0 0 40 50" className="flicker absolute top-[96%] left-1/2 w-[34%] -translate-x-1/2" aria-hidden>
        <path d="M20 0c10 14 14 26 0 50C6 26 10 14 20 0z" fill="#ff9f1c" />
        <path d="M20 10c5 9 7 16 0 30-7-14-5-21 0-30z" fill="#ffe066" />
      </svg>
    </div>
  );
}

export function Bulb() {
  return (
    <div className="relative">
      <div className="glow absolute inset-[-20%] rounded-full bg-[#ffe066]/60 blur-2xl" />
      <svg viewBox="0 0 80 110" className="relative w-full drop-shadow-[0_14px_20px_rgba(244,162,97,0.4)]" aria-hidden>
        <defs>
          <radialGradient id="pt-bulb" cx="0.4" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#fff9db" />
            <stop offset="1" stopColor="#ffd43b" />
          </radialGradient>
        </defs>
        <path d="M40 4a32 32 0 0 0-18 58c4 3 6 8 6 12v6h24v-6c0-4 2-9 6-12A32 32 0 0 0 40 4z" fill="url(#pt-bulb)" />
        <path d="M32 50l8-10 8 10" fill="none" stroke="#f08c00" strokeWidth="3" strokeLinecap="round" />
        <rect x="27" y="82" width="26" height="8" rx="3" fill="#adb5bd" />
        <rect x="29" y="92" width="22" height="8" rx="3" fill="#868e96" />
      </svg>
    </div>
  );
}

export function Trophy() {
  return (
    <svg viewBox="0 0 120 130" className="w-full drop-shadow-[0_22px_30px_rgba(217,119,6,0.35)]" aria-hidden>
      <defs>
        <linearGradient id="pt-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff3bf" />
          <stop offset="0.5" stopColor="#fcc419" />
          <stop offset="1" stopColor="#e67700" />
        </linearGradient>
      </defs>
      <path d="M30 22H10c0 24 10 34 26 36M90 22h20c0 24-10 34-26 36" fill="none" stroke="url(#pt-gold)" strokeWidth="8" />
      <path d="M28 8h64v30c0 22-14 38-32 38S28 60 28 38z" fill="url(#pt-gold)" />
      <rect x="52" y="74" width="16" height="22" fill="#e8a317" />
      <rect x="32" y="96" width="56" height="12" rx="4" fill="url(#pt-gold)" />
      <rect x="24" y="108" width="72" height="16" rx="5" fill="#5c3d2e" />
      <path d="M60 22l5 10 11 1-8 7 2 11-10-6-10 6 2-11-8-7 11-1z" fill="#fff9db" />
    </svg>
  );
}

export function Mic() {
  return (
    <svg viewBox="0 0 60 110" className="w-full drop-shadow-[0_14px_18px_rgba(15,23,42,0.3)]" aria-hidden>
      <defs>
        <linearGradient id="pt-mic" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#495057" />
          <stop offset="1" stopColor="#212529" />
        </linearGradient>
      </defs>
      <rect x="14" y="4" width="32" height="44" rx="16" fill="url(#pt-mic)" />
      {[14, 22, 30, 38].map((y) => (
        <line key={y} x1="18" y1={y} x2="42" y2={y} stroke="#868e96" strokeWidth="2" />
      ))}
      <path d="M8 38a22 22 0 0 0 44 0" fill="none" stroke="#adb5bd" strokeWidth="4" />
      <rect x="27" y="60" width="6" height="34" fill="#adb5bd" />
      <rect x="12" y="94" width="36" height="8" rx="4" fill="#495057" />
    </svg>
  );
}

export function Cursor() {
  return (
    <svg viewBox="0 0 24 24" className="w-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)]" aria-hidden>
      <path d="M4 2l16 9-7 2-3 7z" fill="#0d0e10" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function Flame() {
  return (
    <svg viewBox="0 0 60 80" className="flicker w-full" aria-hidden>
      <defs>
        <linearGradient id="pt-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#f03e3e" />
          <stop offset="0.6" stopColor="#ff922b" />
          <stop offset="1" stopColor="#ffd43b" />
        </linearGradient>
      </defs>
      <path d="M30 2c6 16 26 24 26 48a26 26 0 0 1-52 0C4 34 16 28 18 14c6 8 8 12 12-12z" fill="url(#pt-flame)" />
      <path d="M30 40c4 8 12 12 12 22a12 12 0 0 1-24 0c0-8 8-12 12-22z" fill="#fff3bf" />
    </svg>
  );
}
