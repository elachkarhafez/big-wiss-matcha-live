"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";

export function ComingSoonCta() {
  return (
    <section className="relative py-20 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #0a1f14 0%, #0d2318 100%)" }}>
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(125, 206, 160, 0.06) 0%, transparent 70%)" }} />

      {/* Horizontal rule top */}
      <div className="max-w-4xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          {/* COMING SOON badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7dcea0]/30 bg-[#7dcea0]/10 px-5 py-2 mb-8">
            <span className="inline-block w-2 h-2 rounded-full bg-[#7dcea0] animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#7dcea0]">Now Booking · Summer 2026</span>
          </div>

          <h2
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
          >
            Save Your Spot<br />
            <span style={{ background: "linear-gradient(135deg, #7dcea0 0%, #c4f0d5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Before It's Gone.
            </span>
          </h2>

          <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed mb-10">
            Big Wiss Matcha is filling up fast. Lock in your event date now —
            submit a catering request and we'll have a full proposal back to you within 24 hours.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catering"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-10 py-4 text-[13px] font-bold uppercase tracking-[0.08em] text-[#0f2318] hover:bg-white/90 transition-all duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.2)] group"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Catering Now
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/catering"
              className="inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200"
              style={{ border: "1.5px solid rgba(125, 206, 160, 0.25)", background: "rgba(125, 206, 160, 0.05)" }}
            >
              Save Your Spot →
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/25">
            <span>24hr response</span>
            <span>·</span>
            <span>Dearborn & SE Michigan</span>
            <span>·</span>
            <span>No commitment to inquire</span>
          </div>
        </motion.div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16" />
      </div>
    </section>
  );
}
