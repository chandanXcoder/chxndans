import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import BookingSection from "@/components/BookingSection";
import BookCallScene from "@/components/illustrations/BookCallScene";
import BookCallForm from "@/components/forms/BookCallForm";
import { CALL_TIMES, callDates, takenSlots } from "@/lib/store";

export const metadata: Metadata = {
  title: "Book a call",
  description: "Pick a free 30-minute slot to talk about your project.",
};

export default function BookCallPage() {
  return (
    <BookingSection
      label="Book a call"
      title={
        <>
          Let&apos;s talk
          <br />
          <span className="text-muted">about your idea.</span>
        </>
      }
      sub="Pick a free slot and we'll spend 30 minutes on your goals, scope and the best way to build it."
      art={<BookCallScene />}
      points={["Free 30-minute call", "Google Meet, phone or WhatsApp", "Monday to Saturday, India time (IST)"]}
    >
      <Suspense fallback={<div className="h-[640px] animate-pulse rounded-3xl bg-surface" />}>
        <CallSlots />
      </Suspense>
    </BookingSection>
  );
}

// Free slots change with every booking, so they're read at request time.
async function CallSlots() {
  await connection();
  // If storage can't be read, still show the form: bookCall re-checks the slot when saving.
  const taken = await takenSlots().catch((e) => {
    console.error("[book-call] couldn't load taken slots:", e);
    return [];
  });
  return <BookCallForm dates={callDates()} times={CALL_TIMES} taken={taken} />;
}
