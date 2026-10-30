import Reveal from "./ui/Reveal";

type Props = {
  label: string;
  title: React.ReactNode;
  sub?: string;
  children?: React.ReactNode;
  art?: React.ReactNode; // optional illustration shown beside the text on large screens
};

// Large intro block at the top of inner pages.
export default function PageHeader({ label, title, sub, children, art }: Props) {
  return (
    <section className="card relative overflow-hidden pt-36 pb-12 md:pt-48 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-size-[80px_80px] mask-[radial-gradient(ellipse_at_top,black,transparent_70%)] opacity-50"
      />
      <div className={`container-x relative grid items-center gap-12 ${art ? "lg:grid-cols-[1.25fr_1fr]" : ""}`}>
        <Reveal stagger={0.1}>
          <p className="mb-6 flex items-center gap-3 text-lg text-fg">
            <span className="h-2 w-2 rounded-full bg-fg" />
            {label}
          </p>
          <h1 className={`font-display text-[13vw] font-medium leading-[0.95] tracking-[-0.04em] sm:text-7xl md:text-8xl ${art ? "xl:text-[7rem]" : "lg:text-9xl"}`}>
            {title}
          </h1>
          {sub && <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{sub}</p>}
          {children}
        </Reveal>
        {art && <div className="mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[520px]">{art}</div>}
      </div>
    </section>
  );
}
