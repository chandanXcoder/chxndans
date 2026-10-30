import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorkScene from "@/components/illustrations/WorkScene";
import Projects from "@/components/Projects";
import CTA from "@/components/CTA";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects: a news platform, client e-commerce, a Play Store app and a university club platform.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        art={<WorkScene />}
        label={`Work · ${projects.length} projects`}
        title={
          <>
            Things I&apos;ve
            <br />
            <span className="text-muted">built &amp; shipped.</span>
          </>
        }
        sub="Every project here is real: a digital news portal, a paying client's e-commerce store, an app live on the Play Store and the official platform of a university hobby club."
      />
      <Projects heading={false} />
      <CTA />
    </>
  );
}
