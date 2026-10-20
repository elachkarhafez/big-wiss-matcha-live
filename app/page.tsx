import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BookCart } from "@/components/elevate/book-cart";
import { FlavorLineup } from "@/components/elevate/flavor-lineup";
import { Founder } from "@/components/elevate/founder";
import { HeroPour } from "@/components/elevate/hero-pour";
import { MarqueeBand } from "@/components/elevate/marquee-band";
import { Dock } from "@/components/elevate/dock";
import { Highlights } from "@/components/elevate/highlights";
import { UpClose } from "@/components/elevate/up-close";
import { Proof } from "@/components/elevate/proof";
import { SiteFooter } from "@/components/elevate/site-footer";
import { InstagramGallery } from "@/components/sections/instagram-gallery";
import { FlavorForum } from "@/components/sections/flavor-forum";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroPour />
        <MarqueeBand />
        <Highlights />
        <UpClose />
        <FlavorLineup />
        <Founder />
        <Proof />
        <BookCart />
        <InstagramGallery />
        <FlavorForum />
      </main>
      <SiteFooter />
      <Dock />
    </>
  );
}
