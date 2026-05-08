import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Hero } from "@/components/sections/hero";
import { FlavorForum } from "@/components/sections/flavor-forum";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <FlavorForum />
      </main>
    </>
  );
}
