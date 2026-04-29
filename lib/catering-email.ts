import type { CateringPayload } from "@/types/catering";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function row(label: string, value: string, highlight = false) {
  return `
    <tr>
      <td style="padding:10px 12px;border:1px solid #d4edda;background:${highlight ? "#e8f5e9" : "#f4faf5"};font-weight:600;color:#1a4d2e;width:38%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border:1px solid #d4edda;color:#111827;vertical-align:top;">${escapeHtml(value || "N/A")}</td>
    </tr>
  `;
}

function sectionHeader(title: string) {
  return `
    <tr>
      <td colspan="2" style="padding:14px 12px 8px;background:#1a4d2e;color:#ffffff;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">${escapeHtml(title)}</td>
    </tr>
  `;
}

export function formatCateringEmail(p: CateringPayload) {
  const subject = `🍵 New Catering Request | ${p.fullName} | ${p.eventDate}`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;padding:24px;background:#f0f7f2;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #c8e6c9;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <!-- Header -->
        <div style="padding:28px 28px 24px;background:linear-gradient(135deg,#0a1f14,#1a4d2e);color:#ffffff;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7dcea0;">Big Wiss Matcha</p>
          <h1 style="margin:0 0 6px;font-size:28px;font-weight:700;">New Catering Request</h1>
          <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.65);">Submitted ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        </div>

        <!-- Quick Summary Bar -->
        <div style="padding:16px 28px;background:#e8f5e9;border-bottom:1px solid #c8e6c9;display:flex;gap:20px;flex-wrap:wrap;">
          <div style="font-size:13px;color:#1a4d2e;"><strong>📅 Date:</strong> ${escapeHtml(p.eventDate)}</div>
          <div style="font-size:13px;color:#1a4d2e;"><strong>👥 Guests:</strong> ${escapeHtml(p.guestCount)}</div>
          <div style="font-size:13px;color:#1a4d2e;"><strong>📍 Venue:</strong> ${escapeHtml(p.venueName)}</div>
          <div style="font-size:13px;color:#1a4d2e;"><strong>💰 Budget:</strong> ${escapeHtml(p.budget)}</div>
        </div>

        <div style="padding:20px 28px;">
          <table style="border-collapse:collapse;width:100%;border-radius:8px;overflow:hidden;">
            <tbody>
              ${sectionHeader("Contact Information")}
              ${row("Full Name", p.fullName)}
              ${row("Phone Number", p.phoneNumber)}
              ${row("Email Address", p.emailAddress)}
              ${row("Company / Organization", p.companyOrganization || "N/A")}

              ${sectionHeader("Event Details")}
              ${row("Event Type", p.eventType)}
              ${row("Event Date", p.eventDate)}
              ${row("Start Time", p.eventStartTime)}
              ${row("End Time", p.eventEndTime)}
              ${row("Expected Guest Count", p.guestCount)}

              ${sectionHeader("Venue Information")}
              ${row("Venue Name", p.venueName)}
              ${row("Venue Address", p.venueAddress)}
              ${row("City", p.venueCity)}
              ${row("Indoor / Outdoor", p.indoorOutdoor)}
              ${row("Parking Available", p.parkingAvailable)}

              ${sectionHeader("Menu & Service Preferences")}
              ${row("Drinks Requested", p.drinksRequested.join(", "))}
              ${row("Matcha Strength Preference", p.matchaLevel)}
              ${row("Serving Style", p.servingStyle)}
              ${row("Customizations / Add-ons", p.customizations || "None")}

              ${sectionHeader("Logistics & Setup")}
              ${row("Setup Time Needed", p.setupTime)}
              ${row("Power Access Available", p.powerAccess)}
              ${row("Table Provided by Venue", p.tableProvided)}
              ${row("Budget Range", p.budget)}

              ${sectionHeader("Special Requirements")}
              ${row("Dietary Restrictions", p.dietaryRestrictions || "None")}
              ${row("Allergies", p.allergies || "None")}
              ${row("Special Requests", p.specialRequests || "None")}

              ${sectionHeader("How They Found Us")}
              ${row("Source", p.howDidYouHear)}
              ${row("Referral Name", p.referralName || "N/A")}

              ${sectionHeader("Agreement")}
              ${row("Terms Agreed", p.agreeToTerms ? "✅ Yes — agreed to terms & waiver" : "❌ No")}
              ${row("Electronic Signature", p.electronicSignature)}
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div style="padding:16px 28px;background:#f4faf5;border-top:1px solid #c8e6c9;text-align:center;">
          <p style="margin:0;font-size:12px;color:#5a8f6e;">Big Wiss Matcha · Dearborn, MI · bigwissmatcha.com</p>
          <p style="margin:4px 0 0;font-size:11px;color:#999;">Reply directly to this email to contact the requester at ${escapeHtml(p.emailAddress)}</p>
        </div>
      </div>
    </div>
  `;

  const text = `
BIG WISS MATCHA — NEW CATERING REQUEST
Submitted: ${new Date().toLocaleDateString()}

CONTACT
Name: ${p.fullName}
Phone: ${p.phoneNumber}
Email: ${p.emailAddress}
Company: ${p.companyOrganization || "N/A"}

EVENT DETAILS
Type: ${p.eventType}
Date: ${p.eventDate}
Time: ${p.eventStartTime} – ${p.eventEndTime}
Guests: ${p.guestCount}

VENUE
Name: ${p.venueName}
Address: ${p.venueAddress}, ${p.venueCity}
Indoor/Outdoor: ${p.indoorOutdoor}
Parking: ${p.parkingAvailable}

MENU & SERVICE
Drinks: ${p.drinksRequested.join(", ")}
Matcha Level: ${p.matchaLevel}
Serving Style: ${p.servingStyle}
Customizations: ${p.customizations || "None"}

LOGISTICS
Setup Time: ${p.setupTime}
Power Access: ${p.powerAccess}
Table Provided: ${p.tableProvided}
Budget: ${p.budget}

SPECIAL REQUIREMENTS
Dietary: ${p.dietaryRestrictions || "None"}
Allergies: ${p.allergies || "None"}
Special Requests: ${p.specialRequests || "None"}

HOW THEY FOUND US: ${p.howDidYouHear}
Referral: ${p.referralName || "N/A"}

WAIVER
Agreed to Terms: ${p.agreeToTerms ? "YES" : "NO"}
Signature: ${p.electronicSignature}
  `.trim();

  return { subject, html, text };
}
