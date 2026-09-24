import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { FlavorsExperience } from "@/components/sections/flavors-experience";

export const metadata: Metadata = {
  title: "Featured Flavors | Big Wiss Matcha",
  description:
    "Strawberry Shortcake, Coconut Vanilla, Banana Pudding and Cereal Milk — the rotating specialty drops from the Big Wiss Matcha cart.",
  openGraph: {
    title: "Featured Flavors | Big Wiss Matcha",
    description:
      "The rotating specialty drops from the Big Wiss Matcha cart — scroll through every flavor.",
    type: "website",
  },
};

export default function FlavorsPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <FlavorsExperience />
    </>
  );
}
