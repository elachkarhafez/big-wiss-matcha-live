import { NextResponse } from "next/server";
import { Resend } from "resend";

import { emailConfig, hasEmailConfig } from "@/lib/config";
import { formatCateringEmail } from "@/lib/catering-email";
import type { CateringPayload, CateringResponse } from "@/types/catering";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<CateringResponse>(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const payload = body as CateringPayload;

  // Honeypot check
  if (payload.website && payload.website.trim().length > 0) {
    return NextResponse.json<CateringResponse>(
      { ok: true, message: "Request received." },
      { status: 200 }
    );
  }

  // Basic validation
  const required: (keyof CateringPayload)[] = [
    "fullName", "phoneNumber", "emailAddress", "eventType",
    "eventDate", "eventStartTime", "eventEndTime", "guestCount",
    "venueName", "venueAddress", "venueCity", "indoorOutdoor",
    "matchaLevel", "servingStyle", "budget",
    "agreeToTerms", "electronicSignature"
  ];

  const fieldErrors: Partial<Record<keyof CateringPayload, string>> = {};
  for (const field of required) {
    const val = payload[field];
    if (!val || (typeof val === "string" && val.trim().length === 0)) {
      fieldErrors[field] = "This field is required.";
    }
  }

  if (!payload.drinksRequested || payload.drinksRequested.length === 0) {
    fieldErrors.drinksRequested = "Please select at least one drink.";
  }

  if (!payload.agreeToTerms) {
    fieldErrors.agreeToTerms = "You must agree to the terms to submit.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json<CateringResponse>(
      { ok: false, message: "Please complete all required fields.", fieldErrors },
      { status: 400 }
    );
  }

  if (!hasEmailConfig()) {
    return NextResponse.json<CateringResponse>(
      { ok: false, message: "Email service not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(emailConfig.resendApiKey);
    const { subject, html, text } = formatCateringEmail(payload);

    const { error } = await resend.emails.send({
      from: emailConfig.fromEmail,
      to: [emailConfig.toEmail],
      replyTo: payload.emailAddress,
      subject,
      html,
      text,
    });

    if (error) {
      return NextResponse.json<CateringResponse>(
        { ok: false, message: "Unable to send email at this time. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json<CateringResponse>(
      { ok: true, message: "Your catering request has been submitted! We'll be in touch within 24 hours." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json<CateringResponse>(
      { ok: false, message: "Server error. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
