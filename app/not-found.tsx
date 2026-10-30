import Button from "@/components/ui/Button";
import NotFoundScene from "@/components/illustrations/NotFoundScene";

export default function NotFound() {
  return (
    <section className="card">
      <div className="container-x grid min-h-[80vh] items-center gap-10 pt-32 pb-20 lg:grid-cols-2">
        <div className="flex flex-col items-start">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted">Error 404</p>
          <h1 className="font-display text-7xl font-medium tracking-tight md:text-9xl">
            Lost<span className="text-accent">?</span>
          </h1>
          <p className="mt-6 mb-10 max-w-md text-lg text-muted">This page doesn&apos;t exist, but plenty of good work does.</p>
          <Button href="/">Back home</Button>
        </div>
        <div className="mx-auto w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[520px]">
          <NotFoundScene />
        </div>
      </div>
    </section>
  );
}
