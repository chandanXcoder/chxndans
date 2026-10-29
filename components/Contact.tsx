"use client";

import { useState } from "react";
import Image from "next/image";
import { contact, site } from "@/lib/content";
import Reveal from "./ui/Reveal";
import { Arrow } from "./ui/Button";

const field =
  "w-full rounded-2xl border border-line bg-bg px-5 py-4 text-fg placeholder:text-muted/70 outline-none transition-colors focus:border-accent";

function Chips({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o, i) => (
        <label key={o} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={o}
            defaultChecked={i === 0}
            className="peer sr-only"
          />
          <span className="inline-block rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
            {o}
          </span>
        </label>
      ))}
    </div>
  );
}

// No backend yet: the form opens the visitor's mail app with everything pre-filled.
export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    const message = String(d.get("message") || "").trim();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${d.get("type")}`,
      `Budget: ${d.get("budget")}`,
      "",
      message,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `New project enquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="py-24 md:py-40">
      <div className="container-x grid gap-14 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-lg text-fg">
            <span className="h-2 w-2 rounded-full bg-fg" />
            Start a conversation
          </p>
          <h2 className="font-display text-5xl font-medium leading-[1] tracking-tight md:text-7xl">
            {contact.heading}
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
            {contact.sub}
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Image
              src={site.photo}
              alt={site.fullName}
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover object-[50%_20%] ring-4 ring-surface"
            />
            <div>
              <p className="font-display text-lg leading-tight">
                {site.fullName}
              </p>
              <p className="text-sm text-muted">{site.role}</p>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center justify-between border-b border-line pb-4 font-display text-xl transition-colors hover:text-accent md:text-2xl"
            >
              {site.email}
              <Arrow className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href={site.phoneHref}
              className="group flex items-center justify-between border-b border-line pb-4 font-display text-xl transition-colors hover:text-muted md:text-2xl"
            >
              {site.phone}
              <Arrow className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
            >
              Chat on WhatsApp
              <Arrow />
            </a>
            <p className="text-sm text-muted">
              Usually replies within 24 hours · {site.location}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-8 rounded-3xl border border-line bg-surface p-6 md:p-10"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                placeholder="Your name *"
                className={field}
                autoComplete="name"
              />
              <input
                name="email"
                type="email"
                placeholder="Email *"
                className={field}
                autoComplete="email"
              />
            </div>
            <div>
              <p className="mb-3 text-sm text-muted">What can I help with?</p>
              <Chips name="type" options={contact.projectTypes} />
            </div>
            <div>
              <p className="mb-3 text-sm text-muted">Budget</p>
              <Chips name="budget" options={contact.budgets} />
            </div>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about your project *"
              className={`${field} resize-none`}
            />

            {status === "sent" && (
              <p className="rounded-2xl border border-accent/40 bg-accent/10 px-5 py-4 text-sm text-accent">
                Thank you! Your mail app should open with the message ready to
                send.
              </p>
            )}
            {status === "error" && (
              <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-700">
                Please fill in your name, email and a short message.
              </p>
            )}

            <button
              type="submit"
              className="group flex w-full items-center justify-between rounded-full bg-accent px-7 py-4 font-medium text-accent-ink transition-colors hover:bg-accent/85"
            >
              Send message
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
                <Arrow className="transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
