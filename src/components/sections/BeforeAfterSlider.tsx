"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  label: string;
  className?: string;
};

/**
 * Comparateur avant / après accessible (input range natif : clavier + tactile).
 *
 * TODO_REPLACE_WITH_REAL_CUSTOMER_PHOTOS
 * N'utiliser qu'avec de vraies photos de prestations clients.
 * Ne jamais y placer d'images générées présentées comme des résultats réels.
 */
export function BeforeAfterSlider({ before, after, label, className }: BeforeAfterSliderProps) {
  const [value, setValue] = useState(50);

  return (
    <figure className={cn("relative select-none", className)}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-dark-soft">
        <Image src={after} alt={`Après — ${label}`} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <Image src={before} alt={`Avant — ${label}`} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-ivory" style={{ left: `${value}%` }}>
          <span className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/70 bg-black/40 text-xs text-ivory backdrop-blur">
            ↔
          </span>
        </div>
        <span className="eyebrow absolute top-5 left-5 text-paper">Avant</span>
        <span className="eyebrow absolute top-5 right-5 text-paper">Après</span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label={`Comparer avant et après — ${label}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="eyebrow mt-4 text-muted">{label}</figcaption>
    </figure>
  );
}
