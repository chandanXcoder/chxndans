"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { techIcons, type TechIcon } from "./illustrations/techIcons";
import TechLogo from "./ui/TechLogo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Out = { text: string; tone?: string } | { progress: string };
type Step = { tab: string; icon: TechIcon; cmd: string; out: Out[] };

// The commands the terminal "runs", one after another, forever.
const steps: Step[] = [
  {
    tab: "next",
    icon: techIcons.next,
    cmd: "npm run dev",
    out: [
      { text: "> portfolio@1.0.0 dev", tone: "text-white/40" },
      { text: "▲ Next.js 16 (Turbopack)", tone: "text-white" },
      { text: "- Local:  http://localhost:3000", tone: "text-[#82aaff]" },
      { progress: "Compiling /" },
      { text: "✓ Ready in 1.1s", tone: "text-[#c3e88d]" },
    ],
  },
  {
    tab: "flutter",
    icon: techIcons.flutter,
    cmd: "flutter run",
    out: [
      { text: "Launching lib/main.dart on Pixel 8 in debug mode…", tone: "text-white/60" },
      { progress: "Running Gradle task 'assembleDebug'" },
      { text: "✓ Built build/app/outputs/flutter-apk/app-debug.apk", tone: "text-[#c3e88d]" },
      { text: "🔥 Hot reload ready. Press r to reload.", tone: "text-[#f78c6c]" },
    ],
  },
  {
    tab: "firebase",
    icon: techIcons.firebase,
    cmd: "firebase deploy",
    out: [
      { text: "=== Deploying hosting, firestore, functions", tone: "text-white/60" },
      { progress: "hosting: uploading files" },
      { text: "✔ Deploy complete!", tone: "text-[#ffcb6b]" },
    ],
  },
  {
    tab: "git",
    icon: techIcons.github,
    cmd: "git push origin main",
    out: [
      { text: "Enumerating objects: 42, done.", tone: "text-white/60" },
      { progress: "Writing objects" },
      { text: "To github.com/chandanXcoder", tone: "text-white/60" },
      { text: "✓ main -> main  · 1200+ contributions", tone: "text-[#c3e88d]" },
    ],
  },
];

// A terminal window that types commands and streams their output on a loop.
export default function LiveTerminal() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(ref);
        const tabs = q("[data-tab]");
        gsap.set(q("[data-line]"), { display: "none" });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true });
        q("[data-step]").forEach((stepEl, i) => {
          const s = gsap.utils.selector(stepEl);
          tl.set(tabs, { attr: { "data-active": "false" } }).set(tabs[i], { attr: { "data-active": "true" } });

          // type the command
          tl.set(s("[data-cmd]"), { display: "flex" })
            .from(s("[data-char]"), { opacity: 0, duration: 0.01, stagger: 0.06 })
            .to({}, { duration: 0.35 })
            .set(s("[data-caret]"), { display: "none" });

          // stream the output
          s("[data-out]").forEach((line) => {
            tl.set(line, { display: "flex" }).from(line, { opacity: 0, x: -8, duration: 0.25 });
            const bar = line.querySelector<HTMLElement>("[data-bar]");
            if (bar) {
              const pct = line.querySelector<HTMLElement>("[data-pct]")!;
              const counter = { v: 0 };
              tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "power1.inOut" }, "<")
                .to(
                  counter,
                  {
                    v: 100,
                    duration: 1.3,
                    ease: "power1.inOut",
                    onUpdate: () => {
                      pct.textContent = `${Math.round(counter.v)}%`;
                    },
                  },
                  "<",
                )
                .set(line.querySelector("[data-spin]"), { display: "none" })
                .set(line.querySelector("[data-done]"), { display: "inline" });
            } else {
              tl.to({}, { duration: 0.18 });
            }
          });
          tl.from(s("[data-badge]"), { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(3)" }).to({}, { duration: 0.6 });
        });

        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
        });
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl bg-[#0f1117] text-white shadow-[0_40px_80px_-30px_rgba(15,23,42,0.6)] ring-1 ring-black/10"
    >
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <div className="ml-2 flex min-w-0 gap-1 overflow-hidden">
          {steps.map((st) => (
            <span
              key={st.tab}
              data-tab
              data-active="false"
              className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-white/40 transition-colors duration-300 data-[active=true]:bg-white/10 data-[active=true]:text-white"
            >
              <TechLogo icon={st.icon} className="h-3 w-3" fill="currentColor" />
              {st.tab}
            </span>
          ))}
        </div>
        <span className="ml-auto hidden items-center gap-1.5 font-mono text-[11px] text-white/40 sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#28c840]" />
          zsh
        </span>
      </div>

      {/* output: newest lines push older ones off the top */}
      <div className="flex h-[340px] flex-col justify-end overflow-hidden px-4 py-4 font-mono text-[11.5px] leading-[1.7] sm:h-[380px] sm:text-[13px]">
        {steps.map((st) => (
          <div key={st.tab} data-step className="flex min-w-0 flex-col">
            <div data-line data-cmd className="mt-2 flex items-center gap-2 first:mt-0">
              <span className="text-[#28c840]">➜</span>
              <span className="text-[#82aaff]">~/chandan</span>
              <span className="text-[#c792ea]">git:(main)</span>
              <span className="whitespace-pre">
                {[...st.cmd].map((c, i) => (
                  <span key={i} data-char>
                    {c}
                  </span>
                ))}
              </span>
              <span data-caret className="caret inline-block h-[1.1em] w-[0.55em] bg-white/80" />
              <span data-badge className="ml-auto hidden shrink-0 rounded-md bg-white p-1 sm:block">
                <TechLogo icon={st.icon} className="h-3.5 w-3.5" />
              </span>
            </div>
            {st.out.map((o, i) =>
              "progress" in o ? (
                <div key={i} data-line data-out className="flex items-center gap-2 text-white/70">
                  <span data-spin className="term-spinner w-3 text-[#82aaff]" />
                  <span data-done className="hidden w-3 text-[#c3e88d]">
                    ✓
                  </span>
                  <span className="truncate">{o.progress}</span>
                  <span className="ml-auto h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-white/10 sm:w-28">
                    <span data-bar className="block h-full w-full origin-left rounded-full bg-gradient-to-r from-[#82aaff] to-[#c3e88d]" />
                  </span>
                  <span data-pct className="w-9 shrink-0 text-right tabular-nums text-white/50">
                    100%
                  </span>
                </div>
              ) : (
                <div key={i} data-line data-out className={`flex pl-5 ${o.tone ?? ""}`}>
                  <span className="truncate">{o.text}</span>
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
