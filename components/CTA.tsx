import Image from "next/image";
import { site } from "@/lib/content";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

// "What is next" card that floats on the grey canvas above the footer.
export default function CTA() {
  return (
    <section className="container-x py-16 md:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-bg px-6 py-12 md:rounded-[2.5rem] md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-40 -bottom-48 h-[420px] w-[420px] rounded-full bg-glow/50 blur-[120px]"
          />
          <div className="relative">
            <p className="mb-10 flex items-center gap-3 text-lg md:mb-14">
              <span className="h-2 w-2 rounded-full bg-fg" />
              What is next
              <Image
                src={site.avatar}
                alt={site.fullName}
                width={36}
                height={36}
                className="ml-1 h-9 w-9 rounded-full object-cover"
              />
            </p>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <h2 className="font-display text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                Let&apos;s work
                <br />
                together!
              </h2>
              <div>
                <p className="font-display text-2xl leading-snug tracking-tight md:text-[2.1rem]">
                  Let&apos;s bring your idea to life and turn it into a fast,
                  polished product people love to use.
                </p>
                <div className="mt-10 flex flex-wrap gap-4 md:mt-14">
                  <Button href="/contact/book-call" variant="soft" className="text-base!">
                    Schedule a call <span aria-hidden>👋</span>
                  </Button>
                  <Button
                    href={`mailto:${site.email}?subject=Pricing%20enquiry`}
                    variant="ghost"
                    className="border-fg! text-base!"
                  >
                    Get pricing info <span aria-hidden>💸</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
