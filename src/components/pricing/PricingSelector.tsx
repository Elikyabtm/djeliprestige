"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { business, formatPrice } from "@/config/business";
import { ButtonLink } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type PricingSelectorProps = {
  tone?: "dark" | "light";
};

/**
 * Sélecteur de formules automobile.
 * Desktop : navigation horizontale. Mobile : la même barre devient un
 * slider horizontal (scroll-snap), le contenu change avec transition.
 */
export function PricingSelector({ tone = "dark" }: PricingSelectorProps) {
  const tiers = business.pricing;
  const defaultIndex = Math.max(0, tiers.findIndex((t) => t.featured));
  const [active, setActive] = useState(defaultIndex);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const tier = tiers[active];
  const dark = tone === "dark";

  const select = (index: number) => {
    setActive(index);
    tabRefs.current[index]?.focus();
    tabRefs.current[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = tiers.length - 1;
    if (e.key === "ArrowRight") select(active === last ? 0 : active + 1);
    else if (e.key === "ArrowLeft") select(active === 0 ? last : active - 1);
    else if (e.key === "Home") select(0);
    else if (e.key === "End") select(last);
    else return;
    e.preventDefault();
  };

  return (
    <div className={dark ? "text-paper" : "text-ink"}>
      <div
        role="tablist"
        aria-label="Formules de nettoyage automobile"
        className={cn(
          "-mx-5 flex snap-x snap-mandatory scroll-px-5 overflow-x-auto border-b px-5 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden",
          dark ? "border-paper/10" : "border-ink/10",
        )}
      >
        {tiers.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={cn(
                "group relative flex min-h-16 shrink-0 snap-start flex-col items-start justify-end gap-1 pr-10 pb-5 text-left transition-colors duration-500 md:flex-1 md:pr-4",
                selected
                  ? dark
                    ? "text-paper"
                    : "text-ink"
                  : dark
                    ? "text-paper/45 hover:text-paper/80"
                    : "text-ink/45 hover:text-ink/80",
              )}
            >
              <span className={cn("eyebrow text-[0.6rem]", dark ? "text-gold/80" : "text-gold-deep")}>
                {String(i + 1).padStart(2, "0")}
                {t.featured ? <span className="ml-2 normal-case tracking-normal">· recommandée</span> : null}
              </span>
              <span className="text-[0.8rem] font-medium tracking-[0.24em] uppercase md:text-[0.85rem]">
                {t.name}
              </span>
              {selected ? (
                <motion.span
                  layoutId={`${baseId}-underline`}
                  className="absolute right-0 -bottom-px left-0 h-px bg-gold md:right-4"
                  transition={{ duration: 0.6, ease: EASE }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${tier.id}`}
        tabIndex={0}
        className="relative min-h-[34rem] pt-12 md:min-h-[26rem] lg:pt-16"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3, ease: EASE } }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid gap-12 lg:grid-cols-12"
          >
            <div className="lg:col-span-7">
              <p className={cn("eyebrow", dark ? "text-paper/55" : "text-ink/60")}>{tier.description}</p>
              <h3 className="mt-4 font-serif text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9] font-light tracking-[-0.02em]">
                {tier.featured ? <em className="font-light">{tier.name}</em> : tier.name}
              </h3>
              <ul className={cn("mt-10 grid border-t sm:grid-cols-2", dark ? "border-paper/10" : "border-ink/10")}>
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={cn(
                      "flex items-center gap-4 border-b py-4 text-[0.92rem] sm:pr-6",
                      dark ? "border-paper/10 text-paper/80" : "border-ink/10 text-ink/80",
                    )}
                  >
                    <span aria-hidden className={cn("h-px w-4 shrink-0", dark ? "bg-gold" : "bg-gold-deep")} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-10 lg:col-span-4 lg:col-start-9">
              <dl className="grid grid-cols-2 gap-6 lg:grid-cols-1 lg:gap-10">
                <PriceLine label={business.vehicleSizes.city} value={tier.priceCity} dark={dark} />
                <PriceLine label={business.vehicleSizes.large} value={tier.priceLarge} dark={dark} />
              </dl>
              <ButtonLink
                href={`/contact?service=automobile&formule=${tier.id}`}
                variant={dark ? "light" : "dark"}
                className="self-start"
              >
                Réserver la formule {tier.name}
              </ButtonLink>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PriceLine({ label, value, dark }: { label: string; value: number; dark: boolean }) {
  return (
    <div className={cn("border-t pt-5", dark ? "border-paper/15" : "border-ink/15")}>
      <dt className={cn("eyebrow", dark ? "text-paper/55" : "text-ink/60")}>{label}</dt>
      <dd className="mt-3 font-serif text-[clamp(2.75rem,5vw,4.5rem)] leading-none font-light">
        {formatPrice(value)}
      </dd>
    </div>
  );
}
