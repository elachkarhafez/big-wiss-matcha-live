import type { MatchaLevel, MenuItem } from "@/types/menu";

export const NAV_ITEMS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Menu", href: "#menu", id: "menu" },
  { label: "Events", href: "#events", id: "events" },
  { label: "Media", href: "#media", id: "media" },
  { label: "Book", href: "#book", id: "book" },
  { label: "Location", href: "#location", id: "location" }
] as const;

export const CTA_COPY = {
  heroPrimary: "Book the Vibe",
  inquiryPrimary: "Lock Your Date",
  inquirySubmit: "Send the Details"
} as const;

export const HERO_BADGES = [
  "Founder-Led",
  "Premium Matcha",
  "Dearborn Based",
  "Event Ready"
];

export const ABOUT_BADGES = [
  "Founder-Led",
  "Event Ready",
  "Dearborn Based",
  "Premium Matcha"
];

export const MATCHA_LEVELS: MatchaLevel[] = [
  {
    key: "light",
    label: "Light",
    intensity: "Soft matcha tone with extra smooth finish.",
    glowClass: "from-matcha-100/60 to-transparent"
  },
  {
    key: "balanced",
    label: "Balanced",
    intensity: "Clean signature balance with full flavor body.",
    glowClass: "from-matcha-300/70 to-transparent"
  },
  {
    key: "strong",
    label: "Strong",
    intensity: "Bold matcha edge for a deeper kick.",
    glowClass: "from-matcha-500/65 to-transparent"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    name: "Classic Matcha",
    description: "Smooth, clean, and classic.",
    badge: "Signature",
    price: "$7",
    approved: true,
    supportsLevel: true,
    image: "/product-cups/classic-matcha.png"
  },
  {
    name: "Iced Matcha",
    description: "Cold, creamy, and easy to love.",
    price: "$7",
    supportsLevel: true,
    image: "/product-cups/iced-matcha.png"
  },
  {
    name: "Vanilla Matcha",
    description: "Sweet and balanced with a clean finish.",
    price: "$8",
    supportsLevel: true,
    image: "/product-cups/vanilla-matcha.png"
  },
  {
    name: "Strawberry Matcha",
    description: "Fruity layers with a bright finish.",
    badge: "Popular",
    price: "$8",
    approved: true,
    supportsLevel: true,
    image: "/product-cups/strawberry-matcha.png"
  },
  {
    name: "Honey Matcha",
    description: "Soft sweetness with deep matcha notes.",
    price: "$8",
    supportsLevel: true
  },
  {
    name: "Cream Top",
    description: "Velvety top layer with bold body.",
    badge: "Premium",
    price: "$9",
    approved: true,
    supportsLevel: true,
    image: "/product-cups/cream-top.png"
  },
  {
    name: "Dirty Matcha",
    description: "Matcha with espresso.",
    price: "$9",
    supportsLevel: false,
    image: "/product-cups/dirty-matcha.png"
  },
  {
    name: "Big Wiss Special",
    description: "The house favorite.",
    badge: "House Favorite",
    price: "$10",
    approved: true,
    supportsLevel: true
  }
];

export const MATCHA_OF_THE_WEEK = {
  badge: "Matcha of the Week",
  title: "Big Wiss Special",
  description:
    "Cream-top finish, signature sweetness, and balanced matcha depth. Built for first sips that convert fast."
};

export const EVENT_TYPES = [
  "Weddings",
  "Private Events",
  "Corporate Events",
  "Brand Activations",
  "Pop-Ups",
  "Community Gatherings"
];

export const SERVICE_QUALITIES = [
  {
    title: "Custom Setup",
    description:
      "We shape the station flow around your venue, crowd size, and event style.",
    icon: "layout-grid"
  },
  {
    title: "Clean Presentation",
    description:
      "A polished visual setup that feels elevated and camera-ready from every angle.",
    icon: "sparkles"
  },
  {
    title: "Social-Friendly Experience",
    description:
      "Service moments designed for real engagement, shareable clips, and repeat traffic.",
    icon: "camera"
  },
  {
    title: "Premium Branded Presence",
    description:
      "Founder-led hospitality with a strong visual identity guests remember instantly.",
    icon: "shield"
  },
  {
    title: "Flexible Service Flow",
    description:
      "Fast-paced or intimate service modes based on your timeline and guest movement.",
    icon: "refresh-cw"
  },
  {
    title: "Memorable Guest Experience",
    description:
      "Great drinks, smooth service, and real energy that elevates the room.",
    icon: "star"
  }
];

export const EVENT_PACKAGE_PREVIEWS = [
  {
    title: "Starter Setup",
    summary: "Compact premium station for smaller events with smooth service flow.",
    includes: "Core menu, branded setup, quick guest throughput"
  },
  {
    title: "Full Experience",
    summary: "High-impact service package with richer menu presentation and pacing.",
    includes: "Expanded menu, visual enhancements, premium hospitality"
  },
  {
    title: "Custom Event",
    summary:
      "Tailored build for unique venues, branded activations, and elevated guest paths.",
    includes: "Custom flow, creative direction, collaborative planning"
  }
];

export const VIBE_CARDS = [
  { title: "Smooth Energy", copy: "Steady lift with premium flavor flow." },
  { title: "Clean Boost", copy: "Focused feel without the messy edge." },
  { title: "No Crash", copy: "Strong momentum that still feels clean." },
  { title: "Looks Good, Tastes Better", copy: "Camera-ready drinks with real flavor." }
];

export const SEEN_AT_ITEMS = [
  "Weddings",
  "Private Parties",
  "Brand Activations",
  "Community Events",
  "Corporate Gatherings",
  "Pop-Ups"
];

export const MEDIA_ITEMS = [
  {
    id: "matcha-moment",
    title: "Matcha Moment",
    label: "Matcha Moment",
    type: "video" as const,
    src: "/videos/matcha-pov.mp4",
    poster: "/images/big-wiss-action-poster.png",
    category: "Reaction Clips"
  },
  {
    id: "big-wiss-pick",
    title: "Big Wiss Pick",
    label: "Big Wiss Pick",
    type: "video" as const,
    src: "/videos/matcha-pov.mp4",
    poster: "/images/big-wiss-action-poster.png",
    category: "Event Footage"
  }
];

export const MEDIA_EXPANSION_CATEGORIES = [
  "Reaction Clips",
  "First-Sip Moments",
  "Event Footage",
  "Behind-the-Scenes Prep"
];

export const REACTION_WALL_PLACEHOLDERS = [
  {
    title: "First Sip Reactions",
    note: "Your real guest clips can drop here."
  },
  {
    title: "Creator Highlights",
    note: "Pull standout moments from your next pop-up."
  },
  {
    title: "Guest Testimonials",
    note: "Short quotes and video snippets go live here."
  }
];

export const INQUIRY_EVENT_SHORTCUTS = [
  { label: "Wedding", value: "Weddings" },
  { label: "Private Event", value: "Private Events" },
  { label: "Corporate", value: "Corporate Events" },
  { label: "Pop-Up", value: "Pop-Ups" },
  { label: "Brand Activation", value: "Brand Activations" }
];

export const NEXT_AVAILABLE_DATES = [
  "Apr 12, 2026",
  "Apr 18, 2026",
  "Apr 24, 2026",
  "May 2, 2026"
];

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "YouTube", href: "#" }
];

export const LOCATION_DETAILS = {
  name: "Big Wiss Matcha",
  addressLine1: "13731 W Warren Ave",
  addressLine2: "Dearborn, MI 48126",
  phoneDisplay: "(313) 624-9707",
  phoneHref: "13136249707",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=13731+W+Warren+Ave+Dearborn+MI+48126"
};

export const INDOOR_OUTDOOR_OPTIONS = ["Indoor", "Outdoor", "Both"];

export const HEAR_ABOUT_OPTIONS = [
  "Instagram",
  "TikTok",
  "Word of Mouth",
  "Referral",
  "Google",
  "Other"
];
