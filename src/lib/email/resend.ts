// src/lib/email/resend.ts
// Lazily-created Resend client plus the env helpers used by the contact route.
// Every getter tolerates missing config so the contact form keeps working
// (message still saved) even when email delivery is not set up yet.
import { Resend } from "resend";

let client: Resend | null = null;

/** Resend client, or null when RESEND_API_KEY is not configured. */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

/**
 * Verified sender, e.g. `Bibek Timilsina <contact@bibektimilsina.com.np>`.
 * Must be on a domain verified in Resend, otherwise sending is rejected.
 */
export function getResendFromEmail(): string | null {
  return process.env.RESEND_FROM_EMAIL || null;
}

/** Comma-separated admin inbox(es) that receive the notification email. */
export function getAdminNotificationEmails(): string[] {
  return (process.env.CONTACT_NOTIFICATION_EMAILS || "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}
