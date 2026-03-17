const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "";

export const appConfig = {
  siteName: "Big Wiss Matcha",
  siteDescription:
    "Founder-led premium matcha pop-up in Dearborn, Michigan. Book Big Wiss Matcha for events, activations, and standout guest experiences.",
  siteUrl: "https://bigwissmatcha.com"
};

export const emailConfig = {
  resendApiKey: RESEND_API_KEY,
  toEmail: CONTACT_TO_EMAIL,
  fromEmail: CONTACT_FROM_EMAIL
};

export function hasEmailConfig() {
  return (
    emailConfig.resendApiKey.length > 0 &&
    emailConfig.toEmail.length > 0 &&
    emailConfig.fromEmail.length > 0
  );
}
