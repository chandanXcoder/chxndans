import Hero from "@/components/Hero";
import StatsMarquee from "@/components/StatsMarquee";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import Expertise from "@/components/Expertise";
import BehindTheCode from "@/components/BehindTheCode";
import { projects } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsMarquee />
      <Projects items={projects.slice(0, 3)} showAll />
      <BehindTheCode />
      <Services />
      <About compact />
      <Skills />
      <Expertise />
      <CTA />
    </>
  );
}
