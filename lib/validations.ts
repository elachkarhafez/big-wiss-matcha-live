import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .max(120, "Please keep this field under 120 characters.")
  .optional()
  .or(z.literal(""));

export const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required."),
  phoneNumber: z.string().trim().min(7, "Phone number is required."),
  emailAddress: z
    .string()
    .trim()
    .email("Please provide a valid email address."),
  companyOrganization: optionalText,
  eventType: z.string().trim().min(2, "Event type is required."),
  eventDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please provide an event date."),
  eventTime: z.string().trim().min(1, "Event time is required."),
  venueName: z.string().trim().min(2, "Venue name is required."),
  venueAddress: z.string().trim().min(6, "Venue address is required."),
  guestCount: z.string().trim().min(1, "Guest count is required."),
  indoorOrOutdoor: z.string().trim().min(2, "Please select indoor or outdoor."),
  budget: z.string().trim().min(1, "Budget is required."),
  servicesNeeded: z.string().trim().min(3, "Tell us what services you need."),
  message: z.string().trim().min(8, "Please add a short message."),
  howDidYouHear: z.string().trim().min(2, "Please let us know how you heard about us."),
  website: z.string().max(0).optional().or(z.literal(""))
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
