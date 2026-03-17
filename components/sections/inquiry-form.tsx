"use client";

import { FormEvent, useMemo, useState } from "react";
import { CalendarClock, LoaderCircle, Send } from "lucide-react";

import { SectionContainer } from "@/components/layout/section-container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
import { Textarea } from "@/components/ui/textarea";
import {
  CTA_COPY,
  EVENT_TYPES,
  HEAR_ABOUT_OPTIONS,
  INDOOR_OUTDOOR_OPTIONS,
  INQUIRY_EVENT_SHORTCUTS,
  NEXT_AVAILABLE_DATES
} from "@/lib/constants";
import { inquirySchema, type InquiryFormValues } from "@/lib/validations";
import { cn } from "@/lib/utils";
import type { InquiryResponse } from "@/types/inquiry";

const INITIAL_VALUES: InquiryFormValues = {
  fullName: "",
  phoneNumber: "",
  emailAddress: "",
  companyOrganization: "",
  eventType: "",
  eventDate: "",
  eventTime: "",
  venueName: "",
  venueAddress: "",
  guestCount: "",
  indoorOrOutdoor: "",
  budget: "",
  servicesNeeded: "",
  message: "",
  howDidYouHear: "",
  website: ""
};

type FieldErrors = Partial<Record<keyof InquiryFormValues, string>>;

const selectClasses =
  "h-11 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm text-ink outline-none transition hover:border-ink/30 focus-visible:ring-2 focus-visible:ring-matcha-300";

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) {
    return null;
  }

  return (
    <p id={id} className="mt-1 text-xs font-medium text-red-600">
      {error}
    </p>
  );
}

export function InquiryForm() {
  const [values, setValues] = useState<InquiryFormValues>(INITIAL_VALUES);
  const [showFullForm, setShowFullForm] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [serverMessage, setServerMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const isLoading = status === "loading";

  const isSuccess = status === "success";
  const statusLabel = useMemo(() => {
    if (status === "loading") {
      return "Sending details...";
    }

    if (status === "success") {
      return "Inquiry sent. We will follow up soon.";
    }

    if (status === "error") {
      return serverMessage || "We could not send the inquiry. Please try again.";
    }

    return "";
  }, [status, serverMessage]);

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setValues((previous) => ({ ...previous, [name]: value }));
    if (fieldErrors[name as keyof InquiryFormValues]) {
      setFieldErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  };

  const continueToFullForm = () => {
    const errors: FieldErrors = {};
    if (!values.fullName.trim()) {
      errors.fullName = "Full name is required.";
    }
    if (!values.eventType.trim()) {
      errors.eventType = "Select event type.";
    }
    if (!values.eventDate.trim()) {
      errors.eventDate = "Select event date.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors((previous) => ({ ...previous, ...errors }));
      setStatus("error");
      setServerMessage("Add name, event type, and date to continue.");
      return;
    }

    setShowFullForm(true);
    setStatus("idle");
    setServerMessage("");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setServerMessage("");

    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success) {
      const errors: FieldErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof InquiryFormValues | undefined;
        if (!key || errors[key]) {
          return;
        }
        errors[key] = issue.message;
      });
      setFieldErrors(errors);
      setStatus("error");
      setServerMessage("Please review the highlighted fields.");
      return;
    }

    setFieldErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });

      const data = (await response.json()) as InquiryResponse;

      if (!response.ok || !data.ok) {
        setStatus("error");
        setServerMessage(data.message || "Could not submit your inquiry.");
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors as FieldErrors);
        }
        return;
      }

      setStatus("success");
      setValues(INITIAL_VALUES);
      setShowFullForm(false);
    } catch {
      setStatus("error");
      setServerMessage("Network issue. Please try again in a moment.");
    }
  };

  return (
    <SectionContainer id="book" className="bg-oat/55">
      <Reveal>
        <SectionHeading
          eyebrow={CTA_COPY.inquiryPrimary}
          title="Event Inquiry"
          description="Start with a few details and we will shape a premium matcha service flow around your event."
        />
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <Card className="border-ink/12 bg-white/95 p-5 sm:p-7 lg:p-8">
          <form onSubmit={onSubmit} noValidate>
            <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="sm:col-span-1">
                  <label htmlFor="fullName" className="field-label">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={values.fullName}
                    onChange={onFieldChange}
                    hasError={Boolean(fieldErrors.fullName)}
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                    autoComplete="name"
                  />
                  <FieldError id="fullName-error" error={fieldErrors.fullName} />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="eventType" className="field-label">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={values.eventType}
                    onChange={onFieldChange}
                    className={cn(selectClasses, fieldErrors.eventType && "border-red-500")}
                    aria-invalid={Boolean(fieldErrors.eventType)}
                    aria-describedby={fieldErrors.eventType ? "eventType-error" : undefined}
                  >
                    <option value="">Select event type</option>
                    {EVENT_TYPES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <FieldError id="eventType-error" error={fieldErrors.eventType} />
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="eventDate" className="field-label">
                    Event Date
                  </label>
                  <Input
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    value={values.eventDate}
                    onChange={onFieldChange}
                    hasError={Boolean(fieldErrors.eventDate)}
                    aria-invalid={Boolean(fieldErrors.eventDate)}
                    aria-describedby={fieldErrors.eventDate ? "eventDate-error" : undefined}
                  />
                  <FieldError id="eventDate-error" error={fieldErrors.eventDate} />
                </div>
              </div>

              <aside className="rounded-2xl border border-ink/10 bg-cream/75 p-4">
                <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-matcha-700">
                  <CalendarClock className="h-4 w-4" />
                  Next Available Dates
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {NEXT_AVAILABLE_DATES.map((date) => (
                    <span
                      key={date}
                      className="rounded-full border border-ink/10 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink/80"
                    >
                      {date}
                    </span>
                  ))}
                </div>
              </aside>
            </div>

            <div className="mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/60">
                Prefill Event Type
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {INQUIRY_EVENT_SHORTCUTS.map((shortcut) => (
                  <Button
                    key={shortcut.label}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-8 rounded-full px-3 text-[10px] uppercase tracking-[0.12em]",
                      values.eventType === shortcut.value
                        ? "border-matcha-500 bg-matcha-100 text-matcha-700"
                        : ""
                    )}
                    onClick={() =>
                      setValues((previous) => ({
                        ...previous,
                        eventType: shortcut.value
                      }))
                    }
                  >
                    {shortcut.label}
                  </Button>
                ))}
              </div>
            </div>

            {!showFullForm ? (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button type="button" onClick={continueToFullForm}>
                  {CTA_COPY.inquiryPrimary}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowFullForm(true)}
                >
                  Open Full Form
                </Button>
              </div>
            ) : null}

            {showFullForm ? (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phoneNumber" className="field-label">
                      Phone Number
                    </label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={onFieldChange}
                      hasError={Boolean(fieldErrors.phoneNumber)}
                      aria-invalid={Boolean(fieldErrors.phoneNumber)}
                      aria-describedby={
                        fieldErrors.phoneNumber ? "phoneNumber-error" : undefined
                      }
                      autoComplete="tel"
                    />
                    <FieldError id="phoneNumber-error" error={fieldErrors.phoneNumber} />
                  </div>

                  <div>
                    <label htmlFor="emailAddress" className="field-label">
                      Email Address
                    </label>
                    <Input
                      id="emailAddress"
                      name="emailAddress"
                      type="email"
                      value={values.emailAddress}
                      onChange={onFieldChange}
                      hasError={Boolean(fieldErrors.emailAddress)}
                      aria-invalid={Boolean(fieldErrors.emailAddress)}
                      aria-describedby={
                        fieldErrors.emailAddress ? "emailAddress-error" : undefined
                      }
                      autoComplete="email"
                    />
                    <FieldError id="emailAddress-error" error={fieldErrors.emailAddress} />
                  </div>

                  <div>
                    <label htmlFor="companyOrganization" className="field-label">
                      Company / Organization
                    </label>
                    <Input
                      id="companyOrganization"
                      name="companyOrganization"
                      value={values.companyOrganization}
                      onChange={onFieldChange}
                      hasError={Boolean(fieldErrors.companyOrganization)}
                      aria-invalid={Boolean(fieldErrors.companyOrganization)}
                      aria-describedby={
                        fieldErrors.companyOrganization
                          ? "companyOrganization-error"
                          : undefined
                      }
                      autoComplete="organization"
                    />
                    <FieldError
                      id="companyOrganization-error"
                      error={fieldErrors.companyOrganization}
                    />
                  </div>

                  <div>
                    <label htmlFor="eventTime" className="field-label">
                      Event Time
                    </label>
                    <Input
                      id="eventTime"
                      name="eventTime"
                      type="time"
                      value={values.eventTime}
                      onChange={onFieldChange}
                      hasError={Boolean(fieldErrors.eventTime)}
                      aria-invalid={Boolean(fieldErrors.eventTime)}
                      aria-describedby={fieldErrors.eventTime ? "eventTime-error" : undefined}
                    />
                    <FieldError id="eventTime-error" error={fieldErrors.eventTime} />
                  </div>

                  <div>
                    <label htmlFor="venueName" className="field-label">
                      Venue Name
                    </label>
                    <Input
                      id="venueName"
                      name="venueName"
                      value={values.venueName}
                      onChange={onFieldChange}
                      hasError={Boolean(fieldErrors.venueName)}
                      aria-invalid={Boolean(fieldErrors.venueName)}
                      aria-describedby={fieldErrors.venueName ? "venueName-error" : undefined}
                    />
                    <FieldError id="venueName-error" error={fieldErrors.venueName} />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="venueAddress" className="field-label">
                      Venue Address
                    </label>
                    <Input
                      id="venueAddress"
                      name="venueAddress"
                      value={values.venueAddress}
                      onChange={onFieldChange}
                      hasError={Boolean(fieldErrors.venueAddress)}
                      aria-invalid={Boolean(fieldErrors.venueAddress)}
                      aria-describedby={
                        fieldErrors.venueAddress ? "venueAddress-error" : undefined
                      }
                    />
                    <FieldError id="venueAddress-error" error={fieldErrors.venueAddress} />
                  </div>

                  <div>
                    <label htmlFor="guestCount" className="field-label">
                      Guest Count
                    </label>
                    <Input
                      id="guestCount"
                      name="guestCount"
                      value={values.guestCount}
                      onChange={onFieldChange}
                      placeholder="Approx. number of guests"
                      hasError={Boolean(fieldErrors.guestCount)}
                      aria-invalid={Boolean(fieldErrors.guestCount)}
                      aria-describedby={fieldErrors.guestCount ? "guestCount-error" : undefined}
                    />
                    <FieldError id="guestCount-error" error={fieldErrors.guestCount} />
                  </div>

                  <div>
                    <label htmlFor="indoorOrOutdoor" className="field-label">
                      Indoor or Outdoor
                    </label>
                    <select
                      id="indoorOrOutdoor"
                      name="indoorOrOutdoor"
                      value={values.indoorOrOutdoor}
                      onChange={onFieldChange}
                      className={cn(
                        selectClasses,
                        fieldErrors.indoorOrOutdoor && "border-red-500"
                      )}
                      aria-invalid={Boolean(fieldErrors.indoorOrOutdoor)}
                      aria-describedby={
                        fieldErrors.indoorOrOutdoor
                          ? "indoorOrOutdoor-error"
                          : undefined
                      }
                    >
                      <option value="">Select option</option>
                      {INDOOR_OUTDOOR_OPTIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <FieldError
                      id="indoorOrOutdoor-error"
                      error={fieldErrors.indoorOrOutdoor}
                    />
                  </div>

                  <div>
                    <label htmlFor="budget" className="field-label">
                      Budget
                    </label>
                    <Input
                      id="budget"
                      name="budget"
                      value={values.budget}
                      onChange={onFieldChange}
                      placeholder="Budget range"
                      hasError={Boolean(fieldErrors.budget)}
                      aria-invalid={Boolean(fieldErrors.budget)}
                      aria-describedby={fieldErrors.budget ? "budget-error" : undefined}
                    />
                    <FieldError id="budget-error" error={fieldErrors.budget} />
                  </div>

                  <div>
                    <label htmlFor="howDidYouHear" className="field-label">
                      How Did You Hear About Us?
                    </label>
                    <select
                      id="howDidYouHear"
                      name="howDidYouHear"
                      value={values.howDidYouHear}
                      onChange={onFieldChange}
                      className={cn(
                        selectClasses,
                        fieldErrors.howDidYouHear && "border-red-500"
                      )}
                      aria-invalid={Boolean(fieldErrors.howDidYouHear)}
                      aria-describedby={
                        fieldErrors.howDidYouHear ? "howDidYouHear-error" : undefined
                      }
                    >
                      <option value="">Select source</option>
                      {HEAR_ABOUT_OPTIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <FieldError id="howDidYouHear-error" error={fieldErrors.howDidYouHear} />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="servicesNeeded" className="field-label">
                      Services Needed
                    </label>
                    <Input
                      id="servicesNeeded"
                      name="servicesNeeded"
                      value={values.servicesNeeded}
                      onChange={onFieldChange}
                      placeholder="Matcha bar setup, custom menu, staff, branded service..."
                      hasError={Boolean(fieldErrors.servicesNeeded)}
                      aria-invalid={Boolean(fieldErrors.servicesNeeded)}
                      aria-describedby={
                        fieldErrors.servicesNeeded ? "servicesNeeded-error" : undefined
                      }
                    />
                    <FieldError
                      id="servicesNeeded-error"
                      error={fieldErrors.servicesNeeded}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="field-label">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={values.message}
                      onChange={onFieldChange}
                      placeholder="Share your event vibe, goals, and anything we should plan for."
                      hasError={Boolean(fieldErrors.message)}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? "message-error" : undefined}
                    />
                    <FieldError id="message-error" error={fieldErrors.message} />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p
                    role="status"
                    aria-live="polite"
                    className={cn(
                      "text-sm",
                      status === "success" && "text-matcha-700",
                      status === "error" && "text-red-600",
                      status === "loading" && "text-ink/75"
                    )}
                  >
                    {statusLabel}
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    aria-disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        {isSuccess ? "Send Another Inquiry" : CTA_COPY.inquirySubmit}
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : null}

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={onFieldChange}
              />
            </div>
          </form>
        </Card>
      </Reveal>
    </SectionContainer>
  );
}
