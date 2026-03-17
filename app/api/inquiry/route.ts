import { NextResponse } from "next/server";
import { Resend } from "resend";

import { emailConfig, hasEmailConfig } from "@/lib/config";
import { formatInquiryEmail } from "@/lib/email";
import { inquirySchema } from "@/lib/validations";
import type { InquiryPayload, InquiryResponse } from "@/types/inquiry";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    const response: InquiryResponse = {
      ok: false,
      message: "Invalid request body."
    };
    return NextResponse.json(response, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: InquiryResponse["fieldErrors"] = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors?.[key as keyof InquiryPayload]) {
        fieldErrors![key as keyof InquiryPayload] = issue.message;
      }
    });

    const response: InquiryResponse = {
      ok: false,
      message: "Please review the required fields.",
      fieldErrors
    };

    return NextResponse.json(response, { status: 400 });
  }

  const payload = parsed.data as InquiryPayload;

  if (payload.website && payload.website.trim().length > 0) {
    const response: InquiryResponse = {
      ok: true,
      message: "Inquiry received."
    };
    return NextResponse.json(response, { status: 200 });
  }

  if (!hasEmailConfig()) {
    const response: InquiryResponse = {
      ok: false,
      message:
        "Email service is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL."
    };
    return NextResponse.json(response, { status: 500 });
  }

  try {
    const resend = new Resend(emailConfig.resendApiKey);
    const { subject, html, text } = formatInquiryEmail(payload);

    const { error } = await resend.emails.send({
      from: emailConfig.fromEmail,
      to: [emailConfig.toEmail],
      replyTo: payload.emailAddress,
      subject,
      html,
      text
    });

    if (error) {
      const response: InquiryResponse = {
        ok: false,
        message: "Unable to send inquiry email at this time."
      };
      return NextResponse.json(response, { status: 502 });
    }

    const response: InquiryResponse = {
      ok: true,
      message: "Inquiry sent successfully."
    };

    return NextResponse.json(response, { status: 200 });
  } catch {
    const response: InquiryResponse = {
      ok: false,
      message: "Server error while sending inquiry."
    };
    return NextResponse.json(response, { status: 500 });
  }
}
