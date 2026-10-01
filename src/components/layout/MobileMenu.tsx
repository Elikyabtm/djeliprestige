"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { business } from "@/config/business";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
};

/** Menu plein écran noir, entrées géantes en apparition progressive. */
export function MobileMenu({ open, onClose, isActive }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col bg-black text-paper lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <nav aria-label="Navigation mobile" className="gutter flex flex-1 flex-col justify-center pt-24">
            <ul className="space-y-1">
              {business.navigation.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%", transition: { duration: 0.3, ease: EASE } }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="group flex items-baseline gap-5 py-1.5"
                    >
                      <span className="eyebrow w-6 text-gold">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={cn(
                          "font-serif text-[clamp(2.6rem,11vw,4.5rem)] leading-[1.05] font-light transition-colors duration-500",
                          isActive(item.href) ? "text-gold-light italic" : "group-hover:text-gold-light",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="gutter flex flex-col gap-2 border-t border-paper/10 py-8 text-sm text-paper/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
          >
            <a href={business.phoneHref} className="min-h-11 py-2 hover:text-gold-light">
              {business.phone}
            </a>
            <a href={business.emailHref} className="min-h-11 py-2 hover:text-gold-light">
              {business.email}
            </a>
            <p className="eyebrow mt-2 text-muted">{business.location}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
