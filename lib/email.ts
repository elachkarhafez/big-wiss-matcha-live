import type { InquiryPayload } from "@/types/inquiry";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 12px;border:1px solid #e8e5dd;background:#f7f5ee;font-weight:600;color:#1f2937;width:38%;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border:1px solid #e8e5dd;color:#111827;">${escapeHtml(value || "N/A")}</td>
    </tr>
  `;
}

export function formatInquiryEmail(payload: InquiryPayload) {
  const subject = `New Event Inquiry | ${payload.fullName} | ${payload.eventDate}`;

  const fields = [
    ["Full Name", payload.fullName],
    ["Phone Number", payload.phoneNumber],
    ["Email Address", payload.emailAddress],
    ["Company / Organization", payload.companyOrganization || "N/A"],
    ["Event Type", payload.eventType],
    ["Event Date", payload.eventDate],
    ["Event Time", payload.eventTime],
    ["Venue Name", payload.venueName],
    ["Venue Address", payload.venueAddress],
    ["Guest Count", payload.guestCount],
    ["Indoor or Outdoor", payload.indoorOrOutdoor],
    ["Budget", payload.budget],
    ["Services Needed", payload.servicesNeeded],
    ["Message", payload.message],
    ["How Did You Hear About Us?", payload.howDidYouHear]
  ] as const;

  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;padding:24px;background:#f8f7f3;">
      <div style="max-width:700px;margin:0 auto;background:#ffffff;border:1px solid #ebe7dc;border-radius:16px;overflow:hidden;">
        <div style="padding:22px 24px;background:linear-gradient(120deg,#1f2a16,#406b37);color:#ffffff;">
          <p style="margin:0 0 8px 0;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;">Big Wiss Matcha</p>
          <h1 style="margin:0;font-size:24px;line-height:1.2;">New Event Inquiry</h1>
        </div>
        <div style="padding:20px 24px;">
          <table style="border-collapse:collapse;width:100%;">
            <tbody>
              ${fields.map(([label, value]) => row(label, value)).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  return { subject, text, html };
}
