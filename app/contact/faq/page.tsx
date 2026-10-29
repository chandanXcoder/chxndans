import type { Metadata } from "next";
import SubNav from "@/components/SubNav";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about availability, process, timelines and the kind of projects I take on.",
};

export default function FAQPage() {
  return (
    <>
      <div className="card pt-28 pb-8 md:pt-32">
        <div className="container-x">
          <SubNav section="Contact" />
        </div>
      </div>
      <FAQ />
      <CTA />
    </>
  );
}
