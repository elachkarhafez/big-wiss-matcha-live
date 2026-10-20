/**
 * The next announced pop-up, copied from its Instagram post. Update this one object
 * when a new pop-up is posted; the homepage status line computes itself from `days`.
 *
 * The street address is deliberately left to the linked post: the site's address is
 * an open question with the owner (see MONTHLY-UPDATE-PLAYBOOK.md, open items).
 */
export type PopUp = {
  /** ISO dates, local Detroit time. */
  days: { date: string; label: string }[];
  /** Start time exactly as posted. End time is only set when the post gives one. */
  starts: string;
  ends?: string;
  /** Area only, never a street address. */
  area: string;
  /** Flavor ids from lib/drops.ts, in the order the post lists them. */
  flavors: string[];
  source: string;
  posted: string;
};

export const NEXT_POPUP: PopUp = {
  days: [
    { date: "2026-10-24", label: "Sat 24 Oct" },
    { date: "2026-10-25", label: "Sun 25 Oct" },
  ],
  starts: "11:00 AM",
  area: "Dearborn Heights",
  flavors: ["tiramisu", "strawberry-shortcake", "coconut-vanilla"],
  source: "https://www.instagram.com/p/Deszopcjfua/",
  posted: "19 Oct 2026",
};

export type PopUpStatus = "upcoming" | "today" | "past";

/** Where today sits relative to the pop-up days (dates compared in Detroit time). */
export function popUpStatus(p: PopUp, now = new Date()): { status: PopUpStatus; daysAway: number } {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Detroit" }).format(now);
  const dates = p.days.map((d) => d.date);
  if (dates.includes(today)) return { status: "today", daysAway: 0 };
  const first = dates[0];
  const last = dates[dates.length - 1];
  if (today < first) {
    const ms = Date.parse(`${first}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`);
    return { status: "upcoming", daysAway: Math.round(ms / 86_400_000) };
  }
  return { status: today > last ? "past" : "upcoming", daysAway: 0 };
}
