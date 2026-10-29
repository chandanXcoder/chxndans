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
      <div className="container-x pt-28 md:pt-32">
        <SubNav section="Contact" />
      </div>
      <div className="-mt-8 [&>section]:bg-transparent">
        <FAQ />
      </div>
      <CTA />
    </>
  );
}
