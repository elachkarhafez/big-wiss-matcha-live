"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowLeft, ChevronRight } from "lucide-react";
import type { CateringPayload, CateringResponse } from "@/types/catering";

const EVENT_TYPES = [
  "Wedding", "Corporate Event", "Birthday Party", "Brand Activation",
  "Private Gathering", "Pop-Up", "Community Event", "Other",
];

const BUDGET_RANGES = [
  "Under $300", "$300 – $500", "$500 – $750", "$750 – $1,000",
  "$1,000 – $1,500", "$1,500 – $2,500", "$2,500+", "Not sure yet",
];

const GUEST_COUNTS = [
  "Under 25", "25 – 50", "51 – 100", "101 – 200",
  "201 – 350", "351 – 500", "500+",
];

const MATCHA_LEVELS = ["Light", "Balanced", "Strong", "Mixed (we'll balance on-site)"];
const SERVING_STYLES = ["Live Station (guests come to us)", "Passed / Pre-poured", "Both"];
const SETUP_TIMES = ["30 minutes", "45 minutes", "1 hour", "1.5 hours", "2+ hours"];
const HOW_HEARD = ["Instagram", "TikTok", "Word of Mouth", "Referral", "Google", "Seen at an event", "Other"];

const TERMS = `
By submitting this form, I acknowledge and agree to the following:

1. RESERVATION: Submitting this form does not guarantee availability. A booking is only confirmed upon receipt of a signed contract and deposit from Big Wiss Matcha.

2. DEPOSIT: A non-refundable deposit (typically 25–50% of the total) is required to hold your date. The remaining balance is due 7 days before the event.

3. CANCELLATION: Cancellations made 14+ days before the event forfeit the deposit. Cancellations within 14 days forfeit the full payment.

4. CHANGES: Menu changes, guest count adjustments, and timeline modifications must be communicated no later than 72 hours before the event.

5. VENUE ACCESS: Client is responsible for ensuring Big Wiss Matcha has safe, legal access to the venue and a dedicated setup area with access to power (if applicable).

6. LIABILITY: Big Wiss Matcha is not responsible for injuries, allergies, or dietary reactions unless caused by gross negligence. The client agrees to inform guests of ingredients upon request.

7. ACCURACY: All information submitted in this form is accurate to the best of my knowledge. I understand that inaccurate information may affect service quality or pricing.

8. ELECTRONIC SIGNATURE: By typing my full name below, I agree this constitutes a legally valid electronic signature.
`.trim();

type FormState = Omit<CateringPayload, "website">;

const EMPTY: FormState = {
  fullName: "", phoneNumber: "", emailAddress: "", companyOrganization: "",
  eventType: "", eventDate: "", eventStartTime: "", eventEndTime: "",
  guestCount: "", venueName: "", venueAddress: "", venueCity: "",
  indoorOutdoor: "", parkingAvailable: "",
  drinksRequested: [], matchaLevel: "", servingStyle: "",
  customizations: "", setupTime: "", powerAccess: "", tableProvided: "",
  budget: "", dietaryRestrictions: "", allergies: "", specialRequests: "",
  howDidYouHear: "", referralName: "",
  agreeToTerms: false, electronicSignature: "",
};

export default function CateringPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  function set(field: keyof FormState, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  }


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: "" }),
      });

      const data: CateringResponse = await res.json();

      if (data.ok) {
        setStatus("success");
        setServerMessage(data.message);
      } else {
        setStatus("error");
        setServerMessage(data.message);
        if (data.fieldErrors) setErrors(data.fieldErrors as Partial<Record<keyof FormState, string>>);
      }
    } catch {
      setStatus("error");
      setServerMessage("Connection error. Please try again or call us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1f14] to-[#122a1c] flex items-center justify-center px-6 py-20">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-[#7dcea0]/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#7dcea0]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Request Submitted!</h1>
          <p className="text-white/60 mb-2">{serverMessage}</p>
          <p className="text-white/40 text-sm mb-10">
            Check your email for a confirmation. We'll reach out within 24 hours to confirm your date.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#0f2318] hover:bg-white/90 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const inputClass = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#7dcea0]/50 focus:border-[#7dcea0]/50 transition-all";
  const selectClass = inputClass + " appearance-none";
  const labelClass = "block text-xs font-semibold uppercase tracking-[0.1em] text-white/50 mb-2";
  const errorClass = "mt-1.5 text-xs text-red-400";

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #0a1f14 0%, #122a1c 40%, #0f2318 100%)" }}>

      {/* Nav bar */}
      <div className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md" style={{ background: "rgba(10, 31, 20, 0.85)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative w-9 h-9">
              <Image src="/logo/big-wiss-logo.jpeg" alt="Big Wiss Matcha" fill className="object-contain rounded-full" />
            </div>
            <span className="text-white font-bold text-sm tracking-wide">BIG WISS MATCHA</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
        </div>
      </div>

      {/* Hero banner */}
      <div className="relative overflow-hidden py-20 px-6 text-center">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(125, 206, 160, 0.06) 0%, transparent 70%)" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#7dcea0]/70 mb-5">Big Wiss Matcha</p>
          <h1 className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1, letterSpacing: "-0.03em" }}>
            Book Catering
          </h1>
          <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed">
            Fill out the form below to request Big Wiss Matcha for your event. We'll confirm your date and send a full proposal within 24 hours.
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Section 1 – Contact */}
          <FormSection title="01 · Contact Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name *" error={errors.fullName}>
                <input className={inputClass} placeholder="Your full name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
              </Field>
              <Field label="Phone Number *" error={errors.phoneNumber}>
                <input className={inputClass} placeholder="(xxx) xxx-xxxx" type="tel" value={form.phoneNumber} onChange={(e) => set("phoneNumber", e.target.value)} />
              </Field>
              <Field label="Email Address *" error={errors.emailAddress}>
                <input className={inputClass} placeholder="you@email.com" type="email" value={form.emailAddress} onChange={(e) => set("emailAddress", e.target.value)} />
              </Field>
              <Field label="Company / Organization" error={errors.companyOrganization}>
                <input className={inputClass} placeholder="Optional" value={form.companyOrganization} onChange={(e) => set("companyOrganization", e.target.value)} />
              </Field>
            </div>
          </FormSection>

          {/* Section 2 – Event Details */}
          <FormSection title="02 · Event Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Event Type *" error={errors.eventType}>
                <select className={selectClass} value={form.eventType} onChange={(e) => set("eventType", e.target.value)}>
                  <option value="">Select event type</option>
                  {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Event Date *" error={errors.eventDate}>
                <input className={inputClass} type="date" value={form.eventDate} onChange={(e) => set("eventDate", e.target.value)} />
              </Field>
              <Field label="Start Time *" error={errors.eventStartTime}>
                <input className={inputClass} type="time" value={form.eventStartTime} onChange={(e) => set("eventStartTime", e.target.value)} />
              </Field>
              <Field label="End Time *" error={errors.eventEndTime}>
                <input className={inputClass} type="time" value={form.eventEndTime} onChange={(e) => set("eventEndTime", e.target.value)} />
              </Field>
              <Field label="Expected Guest Count *" error={errors.guestCount}>
                <select className={selectClass} value={form.guestCount} onChange={(e) => set("guestCount", e.target.value)}>
                  <option value="">Select range</option>
                  {GUEST_COUNTS.map((g) => <option key={g}>{g}</option>)}
                </select>
              </Field>
            </div>
          </FormSection>

          {/* Section 3 – Venue */}
          <FormSection title="03 · Venue Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Venue Name *" error={errors.venueName}>
                <input className={inputClass} placeholder="e.g. Dearborn Inn" value={form.venueName} onChange={(e) => set("venueName", e.target.value)} />
              </Field>
              <Field label="Venue City *" error={errors.venueCity}>
                <input className={inputClass} placeholder="City, State" value={form.venueCity} onChange={(e) => set("venueCity", e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Venue Street Address *" error={errors.venueAddress}>
                  <input className={inputClass} placeholder="123 Main St" value={form.venueAddress} onChange={(e) => set("venueAddress", e.target.value)} />
                </Field>
              </div>
              <Field label="Indoor or Outdoor? *" error={errors.indoorOutdoor}>
                <select className={selectClass} value={form.indoorOutdoor} onChange={(e) => set("indoorOutdoor", e.target.value)}>
                  <option value="">Select</option>
                  <option>Indoor</option><option>Outdoor</option><option>Both</option>
                </select>
              </Field>
              <Field label="Parking Available?" error={errors.parkingAvailable}>
                <select className={selectClass} value={form.parkingAvailable} onChange={(e) => set("parkingAvailable", e.target.value)}>
                  <option value="">Select</option>
                  <option>Yes — free parking</option><option>Yes — paid parking</option>
                  <option>Street parking only</option><option>No parking</option>
                </select>
              </Field>
            </div>
          </FormSection>

          {/* Section 4 – Service Preferences */}
          <FormSection title="04 · Service Preferences">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Matcha Strength Preference *" error={errors.matchaLevel}>
                <select className={selectClass} value={form.matchaLevel} onChange={(e) => set("matchaLevel", e.target.value)}>
                  <option value="">Select</option>
                  {MATCHA_LEVELS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Serving Style *" error={errors.servingStyle}>
                <select className={selectClass} value={form.servingStyle} onChange={(e) => set("servingStyle", e.target.value)}>
                  <option value="">Select</option>
                  {SERVING_STYLES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Customizations / Add-ons" error={errors.customizations}>
                  <textarea className={inputClass + " resize-none"} rows={2} placeholder="e.g. branded cups, extra sweetener options, cold foam..." value={form.customizations} onChange={(e) => set("customizations", e.target.value)} />
                </Field>
              </div>
            </div>
          </FormSection>

          {/* Section 5 – Logistics */}
          <FormSection title="05 · Logistics & Setup">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Setup Time Needed *" error={errors.setupTime}>
                <select className={selectClass} value={form.setupTime} onChange={(e) => set("setupTime", e.target.value)}>
                  <option value="">Select</option>
                  {SETUP_TIMES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Budget Range *" error={errors.budget}>
                <select className={selectClass} value={form.budget} onChange={(e) => set("budget", e.target.value)}>
                  <option value="">Select budget</option>
                  {BUDGET_RANGES.map((b) => <option key={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="Power / Outlet Access?" error={errors.powerAccess}>
                <select className={selectClass} value={form.powerAccess} onChange={(e) => set("powerAccess", e.target.value)}>
                  <option value="">Select</option>
                  <option>Yes — nearby outlet available</option>
                  <option>No — generator needed</option>
                  <option>Not sure</option>
                </select>
              </Field>
              <Field label="Table Provided by Venue?" error={errors.tableProvided}>
                <select className={selectClass} value={form.tableProvided} onChange={(e) => set("tableProvided", e.target.value)}>
                  <option value="">Select</option>
                  <option>Yes — 6ft table provided</option>
                  <option>Yes — 8ft table provided</option>
                  <option>No — we need to bring one</option>
                  <option>Not sure</option>
                </select>
              </Field>
            </div>
          </FormSection>

          {/* Section 6 – Special Requirements */}
          <FormSection title="06 · Special Requirements">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Dietary Restrictions" error={errors.dietaryRestrictions}>
                <input className={inputClass} placeholder="e.g. vegan, gluten-free guests..." value={form.dietaryRestrictions} onChange={(e) => set("dietaryRestrictions", e.target.value)} />
              </Field>
              <Field label="Known Allergies Among Guests" error={errors.allergies}>
                <input className={inputClass} placeholder="e.g. nut allergy, lactose intolerant..." value={form.allergies} onChange={(e) => set("allergies", e.target.value)} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Special Requests / Notes" error={errors.specialRequests}>
                  <textarea className={inputClass + " resize-none"} rows={3} placeholder="Anything else we should know?" value={form.specialRequests} onChange={(e) => set("specialRequests", e.target.value)} />
                </Field>
              </div>
            </div>
          </FormSection>

          {/* Section 7 – How Did You Hear */}
          <FormSection title="07 · How Did You Find Us?">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Source *" error={errors.howDidYouHear}>
                <select className={selectClass} value={form.howDidYouHear} onChange={(e) => set("howDidYouHear", e.target.value)}>
                  <option value="">Select</option>
                  {HOW_HEARD.map((h) => <option key={h}>{h}</option>)}
                </select>
              </Field>
              {(form.howDidYouHear === "Referral" || form.howDidYouHear === "Word of Mouth") && (
                <Field label="Referral Name" error={errors.referralName}>
                  <input className={inputClass} placeholder="Who referred you?" value={form.referralName} onChange={(e) => set("referralName", e.target.value)} />
                </Field>
              )}
            </div>
          </FormSection>

          {/* Section 8 – Waiver */}
          <FormSection title="08 · Waiver & Agreement">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 max-h-64 overflow-y-auto mb-5">
              <pre className="text-xs text-white/50 leading-relaxed whitespace-pre-wrap font-sans">{TERMS}</pre>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group mb-5">
              <div
                className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded-md border-2 flex items-center justify-center transition-all ${
                  form.agreeToTerms ? "bg-[#7dcea0] border-[#7dcea0]" : "border-white/20 bg-white/5 group-hover:border-white/40"
                }`}
                onClick={() => set("agreeToTerms", !form.agreeToTerms)}
              >
                {form.agreeToTerms && <span className="text-[#0f2318] text-xs font-bold">✓</span>}
              </div>
              <span className="text-sm text-white/70 leading-relaxed">
                I have read and agree to the catering terms, cancellation policy, and liability waiver above. *
              </span>
            </label>
            {errors.agreeToTerms && <p className={errorClass}>{errors.agreeToTerms}</p>}

            <Field label="Electronic Signature — Type Your Full Legal Name *" error={errors.electronicSignature}>
              <input
                className={inputClass + " font-serif italic text-base"}
                placeholder="Your full name as signature"
                value={form.electronicSignature}
                onChange={(e) => set("electronicSignature", e.target.value)}
              />
              <p className="mt-1.5 text-[11px] text-white/30">By typing your name, you confirm this is your electronic signature.</p>
            </Field>
          </FormSection>

          {/* Honeypot */}
          <input type="text" name="website" tabIndex={-1} className="hidden" autoComplete="off" value="" readOnly />

          {/* Error message */}
          {status === "error" && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300">
              {serverMessage}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-white py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[#0f2318] hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            {status === "submitting" ? (
              <>
                <div className="w-4 h-4 border-2 border-[#0f2318]/30 border-t-[#0f2318] rounded-full animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                Submit Catering Request
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-white/30 pb-4">
            Questions? Call or text us at{" "}
            <a href="tel:+13137299608" className="text-[#7dcea0] hover:underline">(313) 729-9608</a>
          </p>
        </form>
      </div>
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      className="rounded-2xl border border-white/8 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.03)" }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-6 py-4 border-b border-white/8" style={{ background: "rgba(125, 206, 160, 0.05)" }}>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#7dcea0]">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-white/50 mb-2">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
