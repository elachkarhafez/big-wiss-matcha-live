import { NextResponse } from "next/server";
import { Resend } from "resend";
import { emailConfig, hasEmailConfig } from "@/lib/config";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const { name } = body as { name?: string };
  const flavorName = (name ?? "").trim();

  if (!flavorName || flavorName.length < 2) {
    return NextResponse.json({ ok: false, message: "Too short — give it a name." }, { status: 400 });
  }
  if (flavorName.length > 80) {
    return NextResponse.json({ ok: false, message: "Keep it under 80 characters." }, { status: 400 });
  }

  if (!hasEmailConfig()) {
    // Accept gracefully if email isn't wired up yet — still show success to user
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(emailConfig.resendApiKey);

    await resend.emails.send({
      from: emailConfig.fromEmail,
      to: [emailConfig.toEmail],
      subject: `Weekly Flavor Request: ${flavorName}`,
      text: `Someone just submitted a weekly flavor request on bigwissmatcha.com:\n\n"${flavorName}"\n\nSubmitted: ${new Date().toLocaleString("en-US", { timeZone: "America/Detroit" })}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#0f2318;color:#ffffff;border-radius:12px;">
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#7dcea0;margin-bottom:8px;">Weekly Flavor Request</p>
          <h1 style="font-size:28px;font-weight:800;margin:0 0 20px;">"${flavorName}"</h1>
          <p style="color:rgba(255,255,255,0.5);font-size:13px;">Submitted from bigwissmatcha.com · ${new Date().toLocaleString("en-US", { timeZone: "America/Detroit" })}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Couldn't send. Try again." }, { status: 500 });
  }
}
