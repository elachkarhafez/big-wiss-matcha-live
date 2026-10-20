"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Heart } from "@/components/elevate/heart";

/** Phone-only action bar: appears once the hero is gone, steps aside for the footer. */
export function Dock() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");
    const foot = document.querySelector("footer");
    let heroGone = false, footIn = false;
    const update = () => setShow(heroGone && !footIn);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) heroGone = !e.isIntersecting;
        if (e.target === foot) footIn = e.isIntersecting;
      });
      update();
    }, { threshold: 0 });
    if (hero) io.observe(hero);
    if (foot) io.observe(foot);
    return () => io.disconnect();
  }, []);

  return (
    <div className="bw-dock" data-show={show} aria-hidden={!show}>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0a1a11]/80 p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <a href="#popup" tabIndex={show ? 0 : -1} className="flex-1 rounded-full px-4 py-3 text-center text-[0.8rem] font-semibold text-white/85">
          Next pop-up
        </a>
        <Link href="/catering" tabIndex={show ? 0 : -1} className="bw-btn bw-btn-gold !min-h-[46px] flex-1 !px-4 !text-[0.74rem]">
          Book the cart <Heart className="h-3 w-3" color="#0a1a11" />
        </Link>
      </div>
    </div>
  );
}
