import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SkillsScene from "@/components/illustrations/SkillsScene";
import SubNav from "@/components/SubNav";
import Skills from "@/components/Skills";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Skills",
  description: "Frontend, backend, mobile and deployment tools I use to ship products.",
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        art={<SkillsScene />}
        label="Skills & stack"
        title={
          <>
            Tools I use to
            <br />
            <span className="text-muted">ship fast.</span>
          </>
        }
        sub="A modern JavaScript and Flutter toolkit, covering everything from interface to database to deployment."
      >
        <SubNav section="About" />
      </PageHeader>
      <Skills heading={false} />
      <CTA />
    </>
  );
}
