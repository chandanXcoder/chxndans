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
      <div className="container-x pt-28 md:pt-32">
        <SubNav section="Contact" />
      </div>
      <div className="-mt-8">
        <Contact />
      </div>
    </>
  );
}
