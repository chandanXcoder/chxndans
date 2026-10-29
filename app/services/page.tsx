import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites, web apps, Flutter mobile apps, e-commerce, APIs and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title={
          <>
            What I can
            <br />
            <span className="text-muted">build for you.</span>
          </>
        }
        sub="Everything your product needs to launch, from the first screen to the server, built and supported by one developer."
      />
      <Services heading={false} showAll={false} />
      <Process />
      <CTA />
    </>
  );
}
