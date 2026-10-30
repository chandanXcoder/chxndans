import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AchievementsScene from "@/components/illustrations/AchievementsScene";
import SubNav from "@/components/SubNav";
import Achievements from "@/components/Achievements";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Hackathon results, GitHub consistency, published apps and campus leadership.",
};

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        art={<AchievementsScene />}
        label="Achievements"
        title={
          <>
            Milestones
            <br />
            <span className="text-muted">so far.</span>
          </>
        }
        sub="Consistency on GitHub, results at hackathons, an app on the Play Store and a part in some of the biggest campus events."
      >
        <SubNav section="About" />
      </PageHeader>
      <Achievements />
      <CTA />
    </>
  );
}
