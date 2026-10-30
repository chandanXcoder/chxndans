import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AboutScene from "@/components/illustrations/AboutScene";
import SubNav from "@/components/SubNav";
import About from "@/components/About";
import StatsMarquee from "@/components/StatsMarquee";
import CTA from "@/components/CTA";
import WorksSlider from "@/components/WorksSlider";

export const metadata: Metadata = {
  title: "About",
  description: "Chandan Verma: full-stack web and mobile developer and B.Tech CSE student at Invertis University.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        art={<AboutScene />}
        label="About me"
        title={
          <>
            Full-stack
            <br />
            <span className="text-muted">developer.</span>
          </>
        }
      >
        <SubNav section="About" />
      </PageHeader>
      <StatsMarquee />
      <About />
      <WorksSlider />
      <CTA />
    </>
  );
}
