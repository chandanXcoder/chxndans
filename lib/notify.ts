// Email alerts for new messages and bookings (server only).
// Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (and optionally NOTIFY_TO) in .env.local.
// Without them, alerts are skipped and everything still lands in the admin panel.
import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

let transport: Transporter | null | undefined;

function getTransport() {
  if (transport !== undefined) return transport;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn("[notify] SMTP not configured; email alerts are off.");
    return (transport = null);
  }
  const port = Number(SMTP_PORT) || 465;
  return (transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  }));
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Alert = {
  subject: string;
  fields: [label: string, value: string | undefined][];
  replyTo: string;
  adminPath: "/admin/messages" | "/admin/bookings";
};

// Never throws: a failed email must not fail the form submission.
export async function notify({ subject, fields, replyTo, adminPath }: Alert) {
  const t = getTransport();
  if (!t) return;
  const rows = fields.filter((f): f is [string, string] => Boolean(f[1]));
  const link = `${siteUrl}${adminPath}`;
  try {
    await t.sendMail({
      from: `"${site.name} website" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_TO || site.email,
      replyTo,
      subject,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nOpen admin: ${link}`,
      html: `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
        .map(
          ([k, v]) =>
            `<tr><td style="color:#666;vertical-align:top">${escape(k)}</td><td style="white-space:pre-line">${escape(v)}</td></tr>`,
        )
        .join("")}</table><p style="font-family:sans-serif"><a href="${link}">Open admin panel</a></p>`,
    });
  } catch (e) {
    console.error("[notify] failed to send email:", e);
  }
}
