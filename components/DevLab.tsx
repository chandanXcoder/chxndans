import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import LiveTerminal from "./LiveTerminal";

// "Live from my terminal": commands typing and running in a terminal.
export default function DevLab() {
  return (
    <section id="dev-lab" className="card overflow-hidden py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          label="Live from my terminal"
          title={
            <>
              Code that runs,
              <br />
              <span className="text-muted">not just compiles.</span>
            </>
          }
          aside={
            <p className="max-w-md">
              Next.js on the web, Flutter on the phone, Firebase in the cloud and GitHub holding it all together.
            </p>
          }
        />

        <Reveal className="mx-auto max-w-4xl min-w-0">
          <LiveTerminal />
        </Reveal>
      </div>

    </section>
  );
}
