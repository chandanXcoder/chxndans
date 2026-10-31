import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ExperienceScene from "@/components/illustrations/ExperienceScene";
import SubNav from "@/components/SubNav";
import Clubs from "@/components/Clubs";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Clubs & Events",
  description:
    "A year with I-Tech, the technical club of abhiरुचि – The Hobby Club at Invertis University, and the events I hosted and organised with it: TEDx, Invertia 2026, Nirmiti 2026, Invertthon 2.0 and more.",
};

export default function ClubsPage() {
  return (
    <>
      <PageHeader
        art={<ExperienceScene />}
        label="Clubs & events"
        title={
          <>
            Where I learned
            <br />
            <span className="text-muted">to lead.</span>
          </>
        }
        sub="A year with I-Tech, the technical club of abhiरुचि – The Hobby Club: hosting and organising events, writing proposals, networking and building the club's own website, then the events we ran together."
      >
        <SubNav section="About" />
      </PageHeader>
      <Clubs />
      <CTA />
    </>
  );
}
