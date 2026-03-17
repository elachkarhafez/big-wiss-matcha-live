"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CTA_COPY } from "@/lib/constants";

export function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const trigger = window.innerHeight * 0.65;
      setShow(window.scrollY > trigger);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[85] border-t border-ink/10 bg-cream/92 p-3 backdrop-blur-md transition duration-300 lg:hidden ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      aria-hidden={!show}
    >
      <Link href="#book" className="block">
        <Button size="lg" className="w-full">
          {CTA_COPY.heroPrimary}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
