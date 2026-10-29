"use client";

import { bookProject } from "@/app/actions";
import { contact, services } from "@/lib/content";
import ActionForm, { Chips, Label, PersonFields, field } from "./ActionForm";

export default function BookProjectForm() {
  return (
    <ActionForm
      action={bookProject}
      submitLabel="Book this project"
      success={{
        title: "Project booked!",
        text: "Thanks! I'll review the details and get back to you within 24 hours with next steps and a quote.",
      }}
    >
      <PersonFields />
      <div>
        <Label>Service</Label>
        <select name="service" className={`${field} appearance-none`} defaultValue={services[0].title}>
          {services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
        </select>
      </div>
      <div>
        <Label>Budget</Label>
        <Chips name="budget" options={contact.budgets} />
      </div>
      <div>
        <Label>Timeline</Label>
        <Chips name="timeline" options={contact.timelines} />
      </div>
      <textarea
        name="details"
        rows={5}
        placeholder="Describe your project: goals, features, any links or references *"
        className={`${field} resize-none`}
        required
        maxLength={5000}
      />
    </ActionForm>
  );
}
