"use client";

// Submit button that asks before running a destructive action.
export default function ConfirmButton({ children, message }: { children: React.ReactNode; message: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
      className="rounded-full px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
    >
      {children}
    </button>
  );
}
