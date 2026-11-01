"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";
import { field } from "../forms/ActionForm";
import { Arrow } from "../ui/Button";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="space-y-4">
      <input
        name="password"
        type="password"
        placeholder="Admin password"
        autoComplete="current-password"
        required
        autoFocus
        className={field}
      />
      {error && (
        <p role="alert" className="admin-in rounded-2xl bg-red-500/10 px-5 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-accent py-2 pr-2 pl-6 font-medium text-accent-ink transition-colors duration-300 hover:bg-accent/85 disabled:opacity-60"
      >
        {pending ? "Checking…" : "Log in"}
        <span className="grid h-10 w-10 place-items-center rounded-full bg-current/15">
          {pending ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" aria-hidden />
          ) : (
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          )}
        </span>
      </button>
    </form>
  );
}
