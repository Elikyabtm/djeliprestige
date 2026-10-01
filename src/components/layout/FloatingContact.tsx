"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Mail, MessageCircle, Phone, Plus } from "lucide-react";
import { business } from "@/config/business";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

const actions = [
  { label: "Appeler", detail: business.phone, href: business.phoneHref, icon: Phone, external: false },
  { label: "WhatsApp", detail: business.whatsappDisplay, href: business.whatsapp, icon: MessageCircle, external: true },
  { label: "E-mail", detail: business.email, href: business.emailHref, icon: Mail, external: false },
  { label: "Demander un devis", detail: "Formulaire", href: "/contact", icon: FileText, external: false },
];

/** Contact rapide : capsule minimaliste, pas de bulle verte. */
export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // N'apparaît qu'après le premier écran, pour laisser le hero respirer.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className={cn(
        "fixed right-4 bottom-4 z-30 flex flex-col items-end gap-3 transition-[opacity,translate] duration-700 ease-[var(--ease-prestige)] sm:right-6 sm:bottom-6",
        visible || open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
      inert={!(visible || open)}
    >
      <AnimatePresence>
        {open ? (
          <motion.ul
            id="quick-contact"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5, ease: EASE }}
            className="w-72 overflow-hidden rounded-xl border border-paper/10 bg-black/90 text-paper shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            {actions.map(({ label, detail, href, icon: Icon, external }) => {
              const content = (
                <>
                  <Icon aria-hidden strokeWidth={1.25} className="h-[18px] w-[18px] text-gold" />
                  <span className="flex flex-1 flex-col">
                    <span className="text-[0.7rem] font-medium tracking-[0.2em] uppercase">{label}</span>
                    <span className="mt-0.5 text-xs text-paper/55">{detail}</span>
                  </span>
                  <span aria-hidden className="text-paper/40 transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </>
              );
              const cls =
                "group flex min-h-14 items-center gap-4 border-b border-paper/10 px-5 py-3.5 transition-colors last:border-0 hover:bg-paper/5";
              return (
                <li key={label}>
                  {href.startsWith("/") ? (
                    <Link href={href} className={cls} onClick={() => setOpen(false)}>
                      {content}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      className={cls}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="quick-contact"
        className="group flex h-12 items-center gap-3 rounded-full border border-paper/15 bg-black/80 py-2 pr-2 pl-5 text-paper shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md transition-colors duration-500 hover:border-gold/60"
      >
        <span className="text-[0.66rem] font-medium tracking-[0.24em] uppercase">Contact</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory text-ink">
          <Plus
            aria-hidden
            strokeWidth={1.5}
            className={cn("h-4 w-4 transition-transform duration-500 ease-[var(--ease-prestige)]", open && "rotate-45")}
          />
        </span>
        <span className="sr-only">{open ? "Fermer le contact rapide" : "Ouvrir le contact rapide"}</span>
      </button>
    </div>
  );
}
