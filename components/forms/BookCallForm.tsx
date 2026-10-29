"use client";

import { useState } from "react";
import { bookCall } from "@/app/actions";
import ActionForm, { Chips, Label, PersonFields, field } from "./ActionForm";

// "2026-11-03" -> "Tue, 3 Nov"; dates are plain calendar days, so format in UTC.
const dayLabel = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

const timeLabel = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

export default function BookCallForm({ dates, times, taken }: { dates: string[]; times: string[]; taken: string[] }) {
  const takenOn = (date: string) => times.filter((t) => taken.includes(`${date} ${t}`));
  const open = dates.filter((d) => takenOn(d).length < times.length);
  const [date, setDate] = useState(open[0] ?? dates[0]);
  const busy = takenOn(date);
  const firstFree = times.find((t) => !busy.includes(t));

  return (
    <ActionForm
      action={bookCall}
      submitLabel="Book this call"
      success={{
        title: "Call requested!",
        text: "Your slot is reserved. I'll confirm it by email or WhatsApp shortly with the meeting link.",
      }}
    >
      <PersonFields />
      <div>
        <Label>Pick a day</Label>
        <Chips
          name="date"
          options={dates.map((d) => ({ value: d, label: dayLabel(d) }))}
          defaultValue={date}
          disabled={dates.filter((d) => !open.includes(d))}
          onChange={setDate}
        />
      </div>
      <div>
        <Label>Pick a time (IST, 30 minutes)</Label>
        {firstFree ? (
          <Chips
            key={date}
            name="time"
            options={times.map((t) => ({ value: t, label: timeLabel(t) }))}
            defaultValue={firstFree}
            disabled={busy}
          />
        ) : (
          <p className="text-sm text-muted">No free slots on this day.</p>
        )}
      </div>
      <textarea
        name="topic"
        rows={4}
        placeholder="What would you like to discuss? (optional)"
        className={`${field} resize-none`}
        maxLength={2000}
      />
    </ActionForm>
  );
}
