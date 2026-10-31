import TechOrbit from "../TechOrbit";
import MiniTerminal from "../MiniTerminal";

// Skills page header art: the tech orbit with terminal chips floating around it.
export default function SkillsHeroArt() {
  return (
    <div className="relative">
      <TechOrbit />
      <div className="float pointer-events-none absolute top-[4%] -left-2 sm:-left-6" style={{ "--d": "6s" } as React.CSSProperties}>
        <MiniTerminal cmd="flutter run" result="✓ Built app-debug.apk" delay={0.8} />
      </div>
      <div
        className="float pointer-events-none absolute right-0 bottom-[6%] sm:-right-4"
        style={{ "--d": "7s", "--delay": "-2s" } as React.CSSProperties}
      >
        <MiniTerminal cmd="firebase deploy" result="✔ Deploy complete!" delay={2.2} />
      </div>
      <div
        className="float pointer-events-none absolute top-[42%] -right-2 hidden sm:block lg:-right-10"
        style={{ "--d": "8s", "--delay": "-4s" } as React.CSSProperties}
      >
        <MiniTerminal cmd="git push" result="✓ main -> main" delay={3.6} />
      </div>
    </div>
  );
}
