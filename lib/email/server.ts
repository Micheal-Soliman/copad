import "server-only";

import nodemailer from "nodemailer";

export type SubmissionEmailAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export type SubmissionEmailField = {
  label: string;
  value: string | number;
};

type SubmissionEmail = {
  subject: string;
  heading: string;
  replyTo?: string;
  fields: SubmissionEmailField[];
  attachments?: SubmissionEmailAttachment[];
};

function emailConfig() {
  const user = process.env.GMAIL_SMTP_USER?.trim();
  const password = process.env.GMAIL_SMTP_APP_PASSWORD?.replace(/\s/g, "");
  const recipient = process.env.FORM_NOTIFICATION_EMAIL?.trim();

  if (!user || !password || !recipient) {
    throw new Error(
      "Submission email is not configured. Add GMAIL_SMTP_USER, GMAIL_SMTP_APP_PASSWORD, and FORM_NOTIFICATION_EMAIL.",
    );
  }

  return {
    user,
    password,
    recipient,
    fromName: process.env.FORM_EMAIL_FROM_NAME?.trim() || "COPAD Website",
  };
}

function escapeHtml(value: string | number) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function sendSubmissionEmail(message: SubmissionEmail) {
  const config = emailConfig();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: config.user, pass: config.password },
  });
  const rows = message.fields.filter((field) => String(field.value).trim());
  const text = rows.map((field) => `${field.label}: ${field.value}`).join("\n\n");
  const htmlRows = rows
    .map(
      (field) =>
        `<tr><th style="padding:12px 16px;text-align:left;vertical-align:top;border-bottom:1px solid #dbe8ef;color:#064f78;font:700 13px Arial,sans-serif">${escapeHtml(field.label)}</th><td style="padding:12px 16px;border-bottom:1px solid #dbe8ef;color:#173f55;font:400 14px/1.6 Arial,sans-serif;white-space:pre-wrap">${escapeHtml(field.value)}</td></tr>`,
    )
    .join("");

  await transporter.sendMail({
    from: { name: safeHeader(config.fromName), address: config.user },
    to: config.recipient,
    replyTo: message.replyTo,
    subject: safeHeader(message.subject),
    text: `${message.heading}\n\n${text}`,
    html: `<div style="background:#f4f9fc;padding:28px;font-family:Arial,sans-serif"><div style="max-width:720px;margin:auto;overflow:hidden;border:1px solid #dbe8ef;border-radius:20px;background:#fff"><div style="background:#064f78;padding:24px 28px;color:#fff"><div style="font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#24c7df">COPAD WEBSITE</div><h1 style="margin:10px 0 0;font-size:24px;line-height:1.25">${escapeHtml(message.heading)}</h1></div><table role="presentation" style="width:100%;border-collapse:collapse"><tbody>${htmlRows}</tbody></table></div></div>`,
    attachments: message.attachments,
  });
}
