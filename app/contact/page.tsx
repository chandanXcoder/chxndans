import type { Metadata } from "next";
import Contact from "@/components/Contact";
import SubNav from "@/components/SubNav";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project, hire me for an internship, or just say hi.",
};

export default function ContactPage() {
  return (
    <>
      <div className="card pt-28 pb-8 md:pt-32">
        <div className="container-x">
          <SubNav section="Contact" />
        </div>
      </div>
      <Contact />
    </>
  );
}
