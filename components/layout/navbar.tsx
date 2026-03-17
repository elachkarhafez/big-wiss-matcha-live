"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CTA_COPY, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 14);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[90] border-b border-transparent transition-all duration-300",
        isScrolled
          ? "border-ink/10 bg-cream/80 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="#hero" className="group inline-flex items-center gap-3">
          <motion.span
            className="animate-logo-micro relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-ink/15"
            initial={{ y: 4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Image
              src="/logo/big-wiss-logo.jpeg"
              alt="Big Wiss Matcha logo"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </motion.span>
          <span className="font-display text-2xl uppercase tracking-wide text-ink">
            Big Wiss
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition",
                    isActive
                      ? "bg-matcha-100 text-ink"
                      : "text-ink/75 hover:bg-ink/5 hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="#book" className="hidden lg:block">
            <Button variant="secondary" size="sm">
              {CTA_COPY.heroPrimary}
            </Button>
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matcha-300 lg:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[95] bg-ink/45 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="ml-auto h-full w-[82vw] max-w-[360px] bg-cream p-6 shadow-premium-lg"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <ul className="mt-10 space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="block rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:bg-ink/5"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="#book" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" size="md" className="mt-6 w-full">
                  {CTA_COPY.heroPrimary}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
