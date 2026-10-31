import { skills } from "@/lib/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import TechLogo from "./ui/TechLogo";
import { techIcons, type TechIcon } from "./illustrations/techIcons";

// Logo shown next to each skill; skills without one (event work) stay text-only.
const logos: Record<string, TechIcon> = {
  "React.js": techIcons.react,
  "Next.js": techIcons.next,
  JavaScript: techIcons.javascript,
  TypeScript: techIcons.typescript,
  "Tailwind CSS": techIcons.tailwind,
  "Node.js": techIcons.node,
  "Express.js": techIcons.express,
  Firebase: techIcons.firebase,
  Supabase: techIcons.supabase,
  MongoDB: techIcons.mongodb,
  Flutter: techIcons.flutter,
  Dart: techIcons.dart,
  "Play Store publishing": techIcons.googlePlay,
  Git: techIcons.git,
  GitHub: techIcons.github,
  "VS Code": techIcons.vscode,
  "Android Studio": techIcons.androidStudio,
  Vercel: techIcons.vercel,
};

export default function Skills({ heading = true }: { heading?: boolean }) {
  return (
    <section id="skills" className="card py-20 md:py-28">
      <div className="container-x">
        {heading && (
          <SectionHeading
            label="Skills & stack"
            title={
              <>
                Tools I use to
                <br />
                <span className="text-muted">ship fast.</span>
              </>
            }
          />
        )}

        <Reveal stagger={0.1} className="border-b border-line">
          {skills.map((s, i) => (
            <div
              key={s.title}
              className="group grid gap-4 border-t border-line py-8 transition-colors duration-500 hover:bg-surface md:px-6 md:py-10 lg:grid-cols-[80px_1fr_1.3fr] lg:items-center lg:gap-8"
            >
              <span className="font-display text-sm text-muted">0{i + 1}</span>
              <div>
                <h3 className="font-display text-3xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-2 text-muted">{s.blurb}</p>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {s.items.map((t, j) => {
                  const logo = logos[t];
                  return (
                    <span
                      key={t}
                      className={`inline-flex items-center gap-2 rounded-full border border-line bg-bg py-1.5 text-sm transition duration-300 group-hover:border-fg/30 motion-safe:hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgba(15,23,42,0.35)] ${logo ? "pr-4 pl-1.5" : "px-4"}`}
                      style={{ transitionDelay: `${j * 30}ms` }}
                    >
                      {logo && (
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-surface transition-transform duration-500 group-hover:rotate-[360deg]">
                          <TechLogo icon={logo} className="h-4 w-4" />
                        </span>
                      )}
                      {t}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
