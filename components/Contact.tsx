"use client";

import Image from "next/image";
import { contact, site } from "@/lib/content";
import Reveal from "./ui/Reveal";
import { Arrow } from "./ui/Button";
import ActionForm, { Chips, Label, PersonFields, field } from "./forms/ActionForm";
import { sendMessage } from "@/app/actions";
import ContactScene from "./illustrations/ContactScene";

// Messages are saved to the admin inbox (see app/actions.ts).
export default function Contact() {
  return (
    <section id="contact" className="card py-20 md:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
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
              src={site.avatar}
              alt={site.fullName}
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover ring-4 ring-surface"
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
          <div className="mt-12 max-w-[320px] sm:max-w-[400px]">
            <ContactScene />
          </div>
        </Reveal>

        <Reveal>
          <ActionForm
            action={sendMessage}
            submitLabel="Send message"
            success={{
              title: "Message received!",
              text: "Thanks for reaching out. I've got your message and will reply within 24 hours.",
            }}
          >
            <PersonFields />
            <div>
              <Label>What can I help with?</Label>
              <Chips name="type" options={contact.projectTypes} />
            </div>
            <div>
              <Label>Budget</Label>
              <Chips name="budget" options={contact.budgets} />
            </div>
            <textarea
              name="message"
              rows={5}
              placeholder="Tell me about your project *"
              className={`${field} resize-none`}
              required
              maxLength={5000}
            />
          </ActionForm>
        </Reveal>
      </div>
    </section>
  );
}
