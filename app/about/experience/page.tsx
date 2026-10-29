import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SubNav from "@/components/SubNav";
import Experience from "@/components/Experience";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Experience",
  description: "Freelance development, technical club leadership and campus events.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        label="Experience & leadership"
        title={
          <>
            Building, shipping
            <br />
            <span className="text-muted">&amp; leading.</span>
          </>
        }
        sub="Freelance delivery for real clients, a core role in the I-Tech Technical Club, and organising some of the biggest tech events on campus."
      >
        <SubNav section="About" />
      </PageHeader>
      <div className="-mt-12 md:-mt-20">
        <Experience heading={false} />
      </div>
      <CTA />
    </>
  );
}
