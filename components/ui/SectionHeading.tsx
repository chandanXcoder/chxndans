import Reveal from "./Reveal";

type Props = {
  label: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  // "split": label on the left half, heading on the right (Eloqwnt style).
  layout?: "split" | "stack";
};

export default function SectionHeading({ label, title, aside, layout = "split" }: Props) {
  const split = layout === "split";
  return (
    <Reveal className={`mb-14 grid gap-6 md:mb-24 ${split ? "lg:grid-cols-2 lg:gap-10" : ""}`}>
      <p className="flex items-center gap-3 self-start text-lg text-fg lg:pt-3">
        <span className="h-2 w-2 rounded-full bg-fg" />
        {label}
      </p>
      <div>
        <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h2>
        {aside && <div className="mt-6 text-lg text-muted">{aside}</div>}
      </div>
    </Reveal>
  );
}
