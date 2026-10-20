/**
 * Rotating specialty flavors announced on @whatatastematcha.
 *
 * Every name and every `source` link comes from a real, dated post.
 * `notes` are flavor descriptors drawn from the drink's own name and the
 * captions — they are deliberately NOT an ingredient or allergen declaration.
 *
 * Shared by the homepage teaser (`components/sections/specialty-drops.tsx`)
 * and the full scroll experience at `/flavors`.
 */

export type Note = { emoji: string; label: string };

export type Theme = {
  /** Deep ground the scene washes to. */
  deep: string;
  /** Hero glow and primary accent. */
  glow: string;
  /** Light tint for type and chips. */
  accent: string;
};

export type Drop = {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  cup: string;
  theme: Theme;
  notes: Note[];
  source: string;
  posted: string;
};

export const DROPS: Drop[] = [
  {
    id: "tiramisu",
    name: "Tiramisu",
    tagline: "New for fall",
    blurb:
      "The newest name on the specialty board, announced for the late-October pop-up weekend. A dessert-café flavor over handcrafted matcha, billed as the perfect fall drink.",
    cup: "/product-cups/flavor-tiramisu.webp",
    theme: { deep: "#1E140C", glow: "#C8915E", accent: "#F2DEC6" },
    notes: [
      { emoji: "🍰", label: "Tiramisu" },
      { emoji: "☕", label: "Coffee" },
      { emoji: "🍫", label: "Cocoa" },
      { emoji: "🍵", label: "Matcha" },
    ],
    source: "https://www.instagram.com/p/Deszopcjfua/",
    posted: "19 Oct 2026",
  },
  {
    id: "strawberry-shortcake",
    name: "Strawberry Shortcake",
    tagline: "Berry layered, dessert finish",
    blurb:
      "The one people ask for by name. A bright strawberry base under clean ceremonial matcha, so every sip pulls a little of both.",
    cup: "/product-cups/v3-strawberry.webp",
    theme: { deep: "#2B0B13", glow: "#FF5E7D", accent: "#FFC6D2" },
    notes: [
      { emoji: "🍓", label: "Strawberry" },
      { emoji: "🍰", label: "Shortcake" },
      { emoji: "🥛", label: "Cream" },
      { emoji: "🍵", label: "Matcha" },
    ],
    source: "https://www.instagram.com/p/DcP6bLqDcHU/",
    posted: "19 Aug 2026",
  },
  {
    id: "coconut-vanilla",
    name: "Coconut Vanilla",
    tagline: "Creamy and refreshing",
    blurb:
      "Made with real coconut. Soft vanilla rounds off the matcha instead of burying it — the one a food reviewer called the best matcha he had ever had.",
    cup: "/product-cups/v3-vanilla.webp",
    theme: { deep: "#241E14", glow: "#EBD4A4", accent: "#FFF3DE" },
    notes: [
      { emoji: "🥥", label: "Real coconut" },
      { emoji: "🌼", label: "Vanilla" },
      { emoji: "🥛", label: "Milk" },
      { emoji: "🍵", label: "Matcha" },
    ],
    source: "https://www.instagram.com/reel/DbeOwVdxEJz/",
    posted: "31 Jul 2026",
  },
  {
    id: "banana-pudding",
    name: "Banana Pudding",
    tagline: "Dessert in a cup",
    blurb:
      "Thick, cool and unapologetically sweet. A cream cap sits over the matcha so the first sip is all pudding and the last one is all green.",
    cup: "/product-cups/flavor-banana-pudding.webp",
    theme: { deep: "#2A2009", glow: "#FFD24A", accent: "#FFEBA8" },
    notes: [
      { emoji: "🍌", label: "Banana" },
      { emoji: "🍮", label: "Pudding" },
      { emoji: "🥛", label: "Cream" },
      { emoji: "🍵", label: "Matcha" },
    ],
    source: "https://www.instagram.com/reel/DbWoCFIxpFj/",
    posted: "28 Jul 2026",
  },
  {
    id: "cereal-milk",
    name: "Cereal Milk",
    tagline: "That last-sip-of-the-bowl thing",
    blurb:
      "Toasted, milky and a little nostalgic. One of the newest drops off the cart and the fastest to go on a busy weekend.",
    cup: "/product-cups/flavor-cereal-milk.webp",
    theme: { deep: "#271E10", glow: "#F2B45C", accent: "#FFDFAE" },
    notes: [
      { emoji: "🥣", label: "Cereal milk" },
      { emoji: "🌾", label: "Toasted oat" },
      { emoji: "🥛", label: "Sweet milk" },
      { emoji: "🍵", label: "Matcha" },
    ],
    source: "https://www.instagram.com/p/DcP6bLqDcHU/",
    posted: "19 Aug 2026",
  },
  {
    id: "honey-whip",
    name: "Honey Whip",
    tagline: "All-new, gone fast",
    blurb:
      "A honey-gold whipped cap introduced as an all-new drop over Labor Day weekend. Wiss called it \"to die for\" days later, and it sold out before the next pop-up.",
    cup: "/product-cups/flavor-honey-whip.webp",
    theme: { deep: "#2B1D08", glow: "#F0A93C", accent: "#FFDD9E" },
    notes: [
      { emoji: "🍯", label: "Honey" },
      { emoji: "🫙", label: "Whipped cap" },
      { emoji: "🥛", label: "Cream" },
      { emoji: "🍵", label: "Matcha" },
    ],
    source: "https://www.instagram.com/reel/Dc67CuIP_jz/",
    posted: "5 Sep 2026",
  },
  {
    id: "ube",
    name: "Ube",
    tagline: "Purple yam, paired with a brownie",
    blurb:
      "The purple sweet-potato flavor Wiss pairs with an ube brownie on pop-up days. It made the bestseller list within its first two weekends.",
    cup: "/product-cups/flavor-ube.webp",
    theme: { deep: "#211129", glow: "#9B6BD6", accent: "#D9C2F2" },
    notes: [
      { emoji: "🍠", label: "Ube" },
      { emoji: "🍞", label: "Brownie pairing" },
      { emoji: "🥛", label: "Cream" },
      { emoji: "🍵", label: "Matcha" },
    ],
    source: "https://www.instagram.com/reel/DdNI2hWOo__/",
    posted: "12 Sep 2026",
  },
];

export const IG_URL = "https://www.instagram.com/whatatastematcha/";
