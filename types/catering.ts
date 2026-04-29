export type CateringPayload = {
  // Contact Info
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  companyOrganization?: string;

  // Event Details
  eventType: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  guestCount: string;

  // Venue
  venueName: string;
  venueAddress: string;
  venueCity: string;
  indoorOutdoor: string;
  parkingAvailable: string;

  // Menu & Service
  drinksRequested: string[];
  matchaLevel: string;
  servingStyle: string;
  customizations?: string;

  // Logistics
  setupTime: string;
  powerAccess: string;
  tableProvided: string;
  budget: string;

  // Special Requirements
  dietaryRestrictions?: string;
  allergies?: string;
  specialRequests?: string;

  // Background
  howDidYouHear: string;
  referralName?: string;

  // Waiver
  agreeToTerms: boolean;
  electronicSignature: string;

  // Honeypot
  website?: string;
};

export type CateringResponse = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof CateringPayload, string>>;
};
