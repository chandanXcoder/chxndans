"use client";

import { startTransition, useActionState, useState } from "react";
import type { FormState } from "@/app/actions";
import { Arrow } from "../ui/Button";

export const field =
  "w-full rounded-2xl border border-line bg-bg px-5 py-4 text-fg placeholder:text-muted/70 outline-none transition-colors focus:border-accent";

export function Chips({
  name,
  options,
  defaultValue,
  disabled = [],
  onChange,
}: {
  name: string;
  options: { value: string; label?: string }[] | string[];
  defaultValue?: string;
  disabled?: string[];
  onChange?: (value: string) => void;
}) {
  const list = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <div className="flex flex-wrap gap-2">
      {list.map((o) => {
        const off = disabled.includes(o.value);
        return (
          <label key={o.value} className={off ? "cursor-not-allowed" : "cursor-pointer"}>
            <input
              type="radio"
              name={name}
              value={o.value}
              defaultChecked={o.value === (defaultValue ?? list[0].value)}
              disabled={off}
              onChange={onChange && (() => onChange(o.value))}
              className="peer sr-only"
            />
            <span className="inline-block rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-disabled:border-transparent peer-disabled:bg-surface-2 peer-disabled:text-muted/50 peer-disabled:line-through">
              {o.label ?? o.value}
            </span>
          </label>
        );
      })}
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-sm text-muted">{children}</p>;
}

// Name, email and optional phone, used by every public form.
export function PersonFields() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <input name="name" placeholder="Your name *" className={field} autoComplete="name" required maxLength={100} />
      <input
        name="email"
        type="email"
        placeholder="Email *"
        className={field}
        autoComplete="email"
        required
        maxLength={200}
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone / WhatsApp (optional)"
        className={`${field} sm:col-span-2`}
        autoComplete="tel"
        maxLength={30}
      />
    </div>
  );
}

type Props = {
  action: (state: FormState, d: FormData) => Promise<FormState>;
  submitLabel: string;
  success: { title: string; text: string };
  children: React.ReactNode;
};

// Form wired to a server action. A successful send swaps in a thank-you panel;
// "Send another" remounts the form with a fresh state.
export default function ActionForm(props: Props) {
  const [round, setRound] = useState(0);
  return <Inner key={round} {...props} onReset={() => setRound((r) => r + 1)} />;
}

function Inner({ action, submitLabel, success, children, onReset }: Props & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(action, null);

  if (state?.ok) {
    return (
      <div className="flex flex-col items-start gap-5 rounded-3xl border border-line bg-surface p-8 md:p-10" role="status">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-2xl text-white">✓</span>
        <h3 className="font-display text-3xl font-medium tracking-tight">{success.title}</h3>
        <p className="max-w-md leading-relaxed text-muted">{success.text}</p>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-line bg-bg px-5 py-2.5 text-sm transition-colors hover:border-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  // submit manually so React doesn't clear the fields when validation fails
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => formAction(data));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8 rounded-3xl border border-line bg-surface p-6 md:p-10">
      {children}

      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      {state?.error && (
        <p role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group flex w-full items-center justify-between rounded-full bg-accent px-7 py-4 font-medium text-accent-ink transition-colors hover:bg-accent/85 disabled:opacity-60"
      >
        {pending ? "Sending…" : submitLabel}
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
          <Arrow className="transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </button>
    </form>
  );
}
