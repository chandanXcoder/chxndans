"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";
import { field } from "../forms/ActionForm";

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
        <p role="alert" className="rounded-2xl bg-red-500/10 px-5 py-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-fg px-6 py-4 font-medium text-bg transition-colors hover:bg-fg/85 disabled:opacity-60"
      >
        {pending ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
