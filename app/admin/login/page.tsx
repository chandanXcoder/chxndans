import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/content";
import { adminConfigured } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";
import AdminMotion from "@/components/admin/AdminMotion";
import AdminScene from "@/components/admin/AdminScene";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <section className="card grid min-h-[100vh] items-center py-20 md:py-28">
      <AdminMotion className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div data-reveal className="w-full max-w-md">
          <p className="mb-5 flex items-center gap-3 text-lg text-fg">
            <span className="h-2 w-2 rounded-full bg-fg" />
            Admin panel
          </p>
          <h1 className="font-display text-5xl leading-[1] font-medium tracking-tight md:text-7xl">
            Welcome
            <br />
            <span className="text-muted">back.</span>
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted">
            Messages and bookings from the site land here. Log in to reply and manage them.
          </p>

          <div className="mt-10 mb-8 flex items-center gap-4">
            <Image
              src={site.avatar}
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover ring-4 ring-surface"
            />
            <div>
              <p className="font-display text-lg leading-tight">{site.fullName}</p>
              <p className="text-sm text-muted">{site.role}</p>
            </div>
          </div>

          {adminConfigured() ? (
            <LoginForm />
          ) : (
            <p className="rounded-2xl bg-amber-100 px-5 py-4 text-sm text-amber-900">
              Set <code>ADMIN_PASSWORD</code> in <code>.env.local</code> and restart the server to enable the admin panel.
            </p>
          )}
        </div>

        <div data-reveal className="mx-auto hidden w-full max-w-[520px] lg:block">
          <AdminScene />
        </div>
      </AdminMotion>
    </section>
  );
}
