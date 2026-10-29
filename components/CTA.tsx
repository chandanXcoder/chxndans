import Image from "next/image";
import { site } from "@/lib/content";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

// Closing call-to-action band shown above the footer on most pages.
export default function CTA() {
  return (
    <section className="container-x pb-24 md:pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 md:px-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -bottom-40 h-[480px] w-[480px] rounded-full bg-glow/70 blur-[120px]"
          />
          <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Image
                  src={site.photo}
                  alt={site.fullName}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover object-[50%_20%] ring-2 ring-bg"
                />
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Have a project in mind?
                </p>
              </div>
              <h2 className="font-display text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
                Let&apos;s build something{" "}
                <span className="text-accent">great.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-6 md:items-end">
              <p className="max-w-sm text-muted md:text-right">
                Open for freelance projects, internships and collaborations. I
                reply within 24 hours.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact">Start a project</Button>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center rounded-full border border-line bg-bg px-6 py-3.5 text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  Email me
                </a>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center rounded-full border border-line bg-bg px-6 py-3.5 text-sm transition-colors hover:border-accent"
                >
                  Call me
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
