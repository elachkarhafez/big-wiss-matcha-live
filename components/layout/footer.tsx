import Image from "next/image";
import Link from "next/link";

import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-cream">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="#hero" className="inline-flex items-center gap-3">
              <span className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/30">
                <Image
                  src="/logo/big-wiss-logo.jpeg"
                  alt="Big Wiss Matcha logo"
                  fill
                  className="object-cover"
                />
              </span>
              <span className="font-display text-2xl uppercase tracking-wide">
                Big Wiss Matcha
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-cream/75">
              Founder-led premium matcha pop-up energy from Dearborn, built for
              events that need a standout drink moment.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 font-semibold uppercase tracking-[0.12em] text-cream/90">
                Navigate
              </p>
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href} className="text-cream/75 hover:text-cream">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 font-semibold uppercase tracking-[0.12em] text-cream/90">
                Social
              </p>
              <ul className="space-y-2">
                {SOCIAL_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-cream/75 hover:text-cream"
                      aria-label={item.label}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 font-semibold uppercase tracking-[0.12em] text-cream/90">
                Contact
              </p>
              <a
                href="tel:+13136249707"
                className="block text-cream/75 hover:text-cream"
              >
                (313) 624-9707
              </a>
              <p className="mt-2 text-cream/60">Dearborn, Michigan</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.1em] text-cream/60">
          {"©"} {new Date().getFullYear()} Big Wiss Matcha. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
