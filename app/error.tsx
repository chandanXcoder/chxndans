"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import { site } from "@/lib/content";

// Shown when a page throws at runtime (e.g. storage unreachable), instead of the bare framework error.
export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const digest = error instanceof Error && "digest" in error ? String(error.digest) : null;

  return (
    <section className="card">
      <div className="container-x flex min-h-[80vh] flex-col items-start justify-center pt-32 pb-20">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted">Something broke</p>
        <h1 className="font-display text-6xl font-medium tracking-tight md:text-8xl">
          Oops<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 mb-10 max-w-md text-lg text-muted">
          This page hit a snag on our side. Try again, or email{" "}
          <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => retry()}
            className="rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent/85"
          >
            Try again
          </button>
          <Button href="/" variant="ghost">
            Back home
          </Button>
        </div>
        {digest && <p className="mt-10 font-mono text-xs text-muted/70">Ref: {digest}</p>}
      </div>
    </section>
  );
}
