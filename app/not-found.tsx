import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-32 pb-20">
      <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted">Error 404</p>
      <h1 className="font-display text-7xl font-medium tracking-tight md:text-9xl">
        Lost<span className="text-accent">?</span>
      </h1>
      <p className="mt-6 mb-10 max-w-md text-lg text-muted">This page doesn&apos;t exist, but plenty of good work does.</p>
      <Button href="/">Back home</Button>
    </section>
  );
}
