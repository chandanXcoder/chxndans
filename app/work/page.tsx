import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Projects from "@/components/Projects";
import CTA from "@/components/CTA";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects: a news platform, client e-commerce and a Play Store app.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label={`Work · ${projects.length} projects`}
        title={
          <>
            Things I&apos;ve
            <br />
            <span className="text-muted">built &amp; shipped.</span>
          </>
        }
        sub="Every project here is real: a digital news portal, a paying client's e-commerce store and an app live on the Play Store."
      />
      <div className="-mt-12 md:-mt-24">
        <Projects heading={false} />
      </div>
      <CTA />
    </>
  );
}
