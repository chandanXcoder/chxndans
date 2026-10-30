import type { Metadata } from "next";
import BookingSection from "@/components/BookingSection";
import BookProjectScene from "@/components/illustrations/BookProjectScene";
import BookProjectForm from "@/components/forms/BookProjectForm";

export const metadata: Metadata = {
  title: "Book a project",
  description: "Share your project scope, budget and timeline to get started.",
};

export default function BookProjectPage() {
  return (
    <BookingSection
      label="Book a project"
      title={
        <>
          Ready to build?
          <br />
          <span className="text-muted">Let&apos;s start.</span>
        </>
      }
      sub="Tell me what you need. I'll review it and reply within 24 hours with questions, a plan and a quote."
      art={<BookProjectScene />}
      points={["Clear quote before any work starts", "Weekly progress updates", "Support after launch"]}
    >
      <BookProjectForm />
    </BookingSection>
  );
}
