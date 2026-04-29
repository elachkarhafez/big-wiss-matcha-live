"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { CTA_COPY, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

export function Navbar() {
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
      className="fixed inset-x-0 top-0 z-[90] bg-[#2D5A3D] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
    >
      <motion.nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-8 xl:px-12"
        animate={{
          y: scrollY > 100 ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Logo with animations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="#hero" className="group inline-flex items-center gap-3">
            <motion.span
              className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/25 md:h-12 md:w-12"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
              animate={{ rotateY: 0 }}
            >
              <Image
                src="/logo/big-wiss-logo.jpeg"
                alt="Big Wiss Matcha logo"
                fill
                className="object-cover"
                priority
              />
            </motion.span>
            <motion.span
              className="font-display text-xl font-semibold uppercase tracking-[0.08em] text-white md:text-2xl"
              animate={{ opacity: 1 }}
              whileHover={{ letterSpacing: "0.15em" }}
            >
              Big Wiss
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
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="hidden lg:block"
          >
            <Link
              href="#book"
              className="relative inline-block rounded-[24px] bg-[#1A1A1A] px-7 py-3 text-[13px] font-semibold uppercase tracking-[1px] text-white overflow-hidden group"
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                group-hover={{
                  opacity: 0.2,
                }}
              />
              <span className="relative">{CTA_COPY.heroPrimary}</span>
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
              className="ml-auto h-full w-[82vw] max-w-[360px] bg-[#FAFAF8] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
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
                      className="block rounded-lg px-4 py-3 text-xs font-semibold uppercase tracking-[0.5px] text-[#1A1A1A] hover:bg-[#E8F3E8]"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="#book"
                onClick={() => setIsOpen(false)}
                className="mt-6 block rounded-[24px] bg-[#2D5A3D] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[1px] text-white"
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
