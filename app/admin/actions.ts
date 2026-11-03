"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, requireAdmin, startSession } from "@/lib/auth";
import { update, type BookingStatus, type MessageStatus } from "@/lib/store";

const MESSAGE_STATUSES: MessageStatus[] = ["new", "read", "archived"];
const BOOKING_STATUSES: BookingStatus[] = ["pending", "confirmed", "done", "cancelled"];

export async function login(_: string | null, d: FormData): Promise<string | null> {
  if (!checkPassword(String(d.get("password") ?? ""))) {
    // small delay to slow down password guessing
    await new Promise((r) => setTimeout(r, 800));
    return "Wrong password.";
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

export async function setMessageStatus(id: string, status: MessageStatus) {
  await requireAdmin();
  if (!MESSAGE_STATUSES.includes(status)) return;
  await update("messages", (items) => {
    const m = items.find((x) => x.id === id);
    if (m) m.status = status;
  });
  refresh();
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await update("messages", (items) => {
    const i = items.findIndex((x) => x.id === id);
    if (i !== -1) items.splice(i, 1);
  });
  refresh();
}

export async function setBookingStatus(id: string, status: BookingStatus) {
  await requireAdmin();
  if (!BOOKING_STATUSES.includes(status)) return;
  await update("bookings", (items) => {
    const b = items.find((x) => x.id === id);
    if (b) b.status = status;
  });
  refresh();
}

export async function deleteBooking(id: string) {
  await requireAdmin();
  await update("bookings", (items) => {
    const i = items.findIndex((x) => x.id === id);
    if (i !== -1) items.splice(i, 1);
  });
  refresh();
}
