import Link from "next/link";
import { services } from "@/lib/content";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

function LongArrow() {
  return (
    <svg viewBox="0 0 32 16" fill="none" className="h-4 w-8" aria-hidden>
      <path d="M0 8h30M23 1l7 7-7 7" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function Services({
  heading = true,
  showAll = true,
}: {
  heading?: boolean;
  showAll?: boolean;
}) {
  return (
    <section id="services" className="card py-20 md:py-28">
      <div className="container-x">
        {heading && (
          <SectionHeading
            label="My services"
            title={
              <>
                Everything your product needs to launch — built by one
                developer.
              </>
            }
          />
        )}

        <Reveal stagger={0.06}>
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group grid grid-cols-[3rem_1fr] items-start border-b border-line py-7 md:grid-cols-[5rem_1fr] md:py-9 lg:grid-cols-2 lg:gap-10"
            >
              <span className="pt-1.5 text-lg md:pt-2 md:text-xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex items-center justify-between gap-6">
                  <h3 className="font-display text-2xl tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-3 md:text-[2.4rem]">
                    {s.title}
                  </h3>
                  <span className="shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-2">
                    <LongArrow />
                  </span>
                </div>
                {/* description slides open on hover (always visible on touch screens) */}
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-lg pt-3 text-muted lg:pt-4 lg:pl-3">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Reveal>

        {showAll && (
          <div className="mt-14 flex md:justify-end">
            <Button href="/services" variant="soft">
              All services
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
