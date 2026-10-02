"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { business } from "@/config/business";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

/** Pages dont le haut est sur fond ivoire : header en encre tant qu'on n'a pas scrollé. */
const LIGHT_TOP_ROUTES = ["/contact", "/mentions-legales", "/politique-de-confidentialite", "/cookies"];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lightTop = LIGHT_TOP_ROUTES.includes(pathname);
  const inkMode = lightTop && !scrolled && !menuOpen;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color,backdrop-filter] duration-700 ease-[var(--ease-prestige)]",
          scrolled && !menuOpen
            ? "border-paper/10 bg-black/70 text-paper backdrop-blur-md"
            : "border-transparent bg-transparent",
          inkMode ? "text-ink" : "text-paper",
        )}
      >
        <div
          className={cn(
            "gutter container-wide flex items-center justify-between transition-[height] duration-700 ease-[var(--ease-prestige)]",
            scrolled ? "h-[4.5rem]" : "h-20 lg:h-24",
          )}
        >
          <Logo onClick={() => setMenuOpen(false)} />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-9 xl:gap-11">
              {business.navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="group relative py-2 text-[0.7rem] font-medium tracking-[0.22em] uppercase"
                    >
                      <span
                        className={cn(
                          "transition-colors duration-500",
                          active ? "text-gold" : "opacity-80 group-hover:opacity-100",
                        )}
                      >
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ease-[var(--ease-prestige)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={cn(
                "group hidden min-h-11 items-center gap-2.5 border px-5 text-[0.68rem] font-medium tracking-[0.22em] uppercase transition-colors duration-500 md:inline-flex",
                inkMode
                  ? "border-ink/25 hover:border-gold-deep hover:text-gold-deep"
                  : "border-paper/30 hover:border-gold hover:text-gold-light",
              )}
            >
              Demander un devis
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-7">
                <span
                  className={cn(
                    "absolute left-0 block h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-prestige)]",
                    menuOpen ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-px bg-current transition-all duration-500 ease-[var(--ease-prestige)]",
                    menuOpen ? "top-1.5 w-full -rotate-45" : "top-3 w-2/3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} isActive={isActive} />
    </>
  );
}
