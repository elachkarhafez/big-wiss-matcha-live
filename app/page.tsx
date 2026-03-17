import { CursorGlow } from "@/components/layout/cursor-glow";
import { Footer } from "@/components/layout/footer";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ActionFeature } from "@/components/sections/action-feature";
import { About } from "@/components/sections/about";
import { Events } from "@/components/sections/events";
import { FinalCta } from "@/components/sections/final-cta";
import { Feeling } from "@/components/sections/feeling";
import { Hero } from "@/components/sections/hero";
import { InquiryForm } from "@/components/sections/inquiry-form";
import { Location } from "@/components/sections/location";
import { MediaWall } from "@/components/sections/media-wall";
import { Menu } from "@/components/sections/menu";
import { SeenAtStrip } from "@/components/sections/seen-at-strip";
import { LiquidDivider } from "@/components/ui/liquid-divider";
import { MatchaDropTransition } from "@/components/ui/matcha-drop-transition";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="pb-20 lg:pb-0">
        <Hero />
        <SeenAtStrip />
        <LiquidDivider />
        <About />
        <Menu />
        <MatchaDropTransition />
        <ActionFeature />
        <Feeling />
        <Events />
        <LiquidDivider flip className="my-2" />
        <MediaWall />
        <InquiryForm />
        <Location />
        <FinalCta />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
