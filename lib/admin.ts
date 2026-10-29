import { requireAdmin } from "./auth";
import { readAll } from "./store";

// Everything the admin pages need, newest first. Checks the session first.
export async function loadAdminData() {
  await requireAdmin();
  const [messages, bookings] = await Promise.all([readAll("messages"), readAll("bookings")]);
  const newest = (a: { createdAt: string }, b: { createdAt: string }) => b.createdAt.localeCompare(a.createdAt);
  messages.sort(newest);
  bookings.sort(newest);
  return {
    messages,
    bookings,
    badges: {
      messages: messages.filter((m) => m.status === "new").length,
      bookings: bookings.filter((b) => b.status === "pending").length,
    },
  };
}
