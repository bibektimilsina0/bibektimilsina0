// src/app/api/contact/route.ts
// Public contact form endpoint. Saves the submission, then sends a confirmation
// to the sender and a notification to the admin inbox(es) via Resend.
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import { z } from "zod";

import { connectMongoose } from "@/lib/connecttodb";
import { ContactMessageModel } from "@/lib/models/ContactMessage";
import {
  getAdminNotificationEmails,
  getResendClient,
  getResendFromEmail,
} from "@/lib/email/resend";
import { ContactConfirmationEmail } from "@/emails/contact-confirmation-email";
import { ContactNotificationEmail } from "@/emails/contact-notification-email";

export const runtime = "nodejs";

const CreateContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email"),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().max(5000).optional().default(""),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = CreateContactSchema.parse(body);

    await connectMongoose();
    const created = await ContactMessageModel.create(validatedData);

    const resend = getResendClient();
    const from = getResendFromEmail();
    const adminRecipients = getAdminNotificationEmails();

    if (resend && from) {
      const submittedAt = new Date(created.createdAt).toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      });

      const emails: Parameters<typeof resend.batch.send>[0] = [
        {
          from,
          to: [validatedData.email],
          subject: "Thanks for reaching out — I received your message",
          html: await render(
            ContactConfirmationEmail({
              name: validatedData.name,
              subject: validatedData.subject,
              message: validatedData.message,
            }),
          ),
        },
      ];

      if (adminRecipients.length > 0) {
        emails.push({
          from,
          to: adminRecipients,
          subject: `New contact message from ${validatedData.name}`,
          replyTo: validatedData.email,
          html: await render(
            ContactNotificationEmail({
              name: validatedData.name,
              email: validatedData.email,
              subject: validatedData.subject,
              message: validatedData.message,
              submittedAt,
            }),
          ),
        });
      }

      const { error: resendError } = await resend.batch.send(emails);

      // Email failure must not fail the request — the message is already saved.
      if (resendError) {
        console.error("❌ Failed to send contact emails:", resendError);
      }
    } else {
      console.warn(
        "⚠️ Resend is not configured. Skipping contact email notifications.",
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 },
      );
    }
    console.error("❌ Failed to create contact message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
