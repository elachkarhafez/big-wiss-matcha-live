"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { CTA_COPY, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

export function Navbar() {
  const pathname = usePathname();
  // "#hero" only exists on the home page — off it, every hash link is a dead end.
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[90] transition-[background-color,box-shadow,backdrop-filter] duration-300",
        !isHome
          ? "bg-[#2D5A3D] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          : scrollY > 40
            ? "bg-[#0a1a11]/85 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"
            : "bg-transparent"
      )}
    >
      <motion.nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-8 xl:px-12"

      >
        {/* Logo with animations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={isHome ? "#hero" : "/"}
            aria-label={isHome ? "Big Wiss Matcha" : "Big Wiss Matcha — back to home"}
            className="group inline-flex items-center"
          >
            <motion.span
              className="relative"
              style={{ width: 140, height: 66 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/logo/logo-v2.webp"
                alt="Big Wiss Matcha logo"
                fill
                className="object-contain"
                priority
              />
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <motion.ul
          className="hidden items-center gap-8 lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.id;

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-0 py-1 text-sm font-semibold uppercase tracking-[0.5px] text-white transition-colors duration-200",
                      isActive ? "text-[#C4A57B]" : "text-white hover:text-[#C4A57B]"
                    )}
                  >
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[3px] bg-[#C4A57B]"
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          className="flex items-center gap-2 md:gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back to home — shown on every page except the home page itself, at
              every breakpoint, and never hidden behind the mobile menu. */}
          {!isHome ? (
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}>
              <Link
                href="/"
                aria-label="Back to home page"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white/20 md:px-4 md:text-[12px]"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M19 12H5M11 5l-7 7 7 7" />
                </svg>
                Home
              </Link>
            </motion.div>
          ) : null}

          {/* CTA Button */}
          <motion.div
            className="hidden lg:block"
          >
            <Link href="/catering" className="bw-btn bw-btn-gold !min-h-[44px] !px-6">
              {CTA_COPY.heroPrimary}
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white lg:hidden transition-colors hover:bg-white/10"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[95] bg-black/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="ml-auto h-full w-[82vw] max-w-[360px] border-l border-white/10 bg-[#0a1a11] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <ul className="mt-10 space-y-2">
                {!isHome ? (
                  <li>
                    <Link
                      href="/"
                      className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#9ee0b8] hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M19 12H5M11 5l-7 7 7 7" />
                      </svg>
                      Home
                    </Link>
                  </li>
                ) : null}
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="block rounded-lg px-4 py-4 font-display text-xl font-bold uppercase tracking-[-0.01em] text-white hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/catering"
                onClick={() => setIsOpen(false)}
                className="bw-btn bw-btn-gold mt-6 w-full"
              >
                <span className="leading-none">
                  {CTA_COPY.heroPrimary}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
