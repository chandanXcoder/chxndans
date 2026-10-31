import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/content";
import { adminConfigured } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <section className="card grid min-h-[100vh] place-items-center px-4 py-24">
      <div className="w-full max-w-sm">
        <Image
          src={site.avatar}
          alt=""
          width={64}
          height={64}
          className="mb-6 h-16 w-16 rounded-full object-cover ring-4 ring-surface"
        />
        <p className="mb-2 flex items-center gap-2 text-sm text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-fg" />
          Admin panel
        </p>
        <h1 className="mb-8 font-display text-4xl font-medium tracking-tight">Welcome back.</h1>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="rounded-2xl bg-amber-100 px-5 py-4 text-sm text-amber-900">
            Set <code>ADMIN_PASSWORD</code> in <code>.env.local</code> and restart the server to enable the admin panel.
          </p>
        )}
      </div>
    </section>
  );
}
