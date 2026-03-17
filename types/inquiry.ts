export type InquiryPayload = {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  companyOrganization?: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  guestCount: string;
  indoorOrOutdoor: string;
  budget: string;
  servicesNeeded: string;
  message: string;
  howDidYouHear: string;
  website?: string;
};

export type InquiryResponse = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof InquiryPayload, string>>;
};
