import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import DevIllustration from "./DevIllustration";

const points = [
  { icon: "⌨️", title: "Clean, typed code", text: "TypeScript and Dart, written to be read and extended." },
  { icon: "📱", title: "Tested on real devices", text: "Every screen checked on phones, tablets and desktops." },
  { icon: "🚀", title: "Shipped in small steps", text: "Weekly demos, so you always see progress." },
];

// "Behind the code" section: how I work, next to an animated developer illustration.
export default function BehindTheCode() {
  return (
    <section className="card overflow-hidden py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="flex items-center gap-3 text-lg">
            <span className="h-2 w-2 rounded-full bg-fg" />
            Behind the code
          </p>
          <h2 className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
            Code, coffee &amp;
            <br />
            <span className="text-muted">a lot of shipping.</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted md:text-xl">
            From the first commit to the Play Store release, I build in focused sprints and keep you in the
            loop the whole way.
          </p>
          <ul className="mt-10 space-y-3">
            {points.map((p) => (
              <li key={p.title} className="flex items-start gap-4 rounded-2xl bg-surface p-4 md:p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bg text-xl shadow-sm">
                  {p.icon}
                </span>
                <span>
                  <span className="block font-medium">{p.title}</span>
                  <span className="block text-sm text-muted">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/work">See what I&apos;ve built</Button>
          </div>
        </Reveal>
        <DevIllustration />
      </div>
    </section>
  );
}
