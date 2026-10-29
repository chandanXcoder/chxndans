import Image from "next/image";
import { site } from "@/lib/content";
import SubNav from "./SubNav";
import Reveal from "./ui/Reveal";

// Shared two-column layout for the booking pages: pitch on the left, form on the right.
export default function BookingSection({
  label,
  title,
  sub,
  points,
  children,
}: {
  label: string;
  title: React.ReactNode;
  sub: string;
  points: string[];
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="card pt-28 pb-8 md:pt-32">
        <div className="container-x">
          <SubNav section="Contact" />
        </div>
      </div>
      <section className="card py-20 md:py-28">
        <div className="container-x grid gap-14 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-lg">
              <span className="h-2 w-2 rounded-full bg-fg" />
              {label}
            </p>
            <h1 className="font-display text-5xl font-medium leading-[1] tracking-tight md:text-7xl">{title}</h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">{sub}</p>
            <ul className="mt-10 space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-4 border-b border-line pb-4 text-lg">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-soft text-xs">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-4">
              <Image
                src={site.photo}
                alt={site.fullName}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover object-[50%_20%] ring-4 ring-surface"
              />
              <div>
                <p className="font-display text-lg leading-tight">{site.fullName}</p>
                <p className="text-sm text-muted">Usually replies within 24 hours</p>
              </div>
            </div>
          </Reveal>
          <div>{children}</div>
        </div>
      </section>
    </>
  );
}
