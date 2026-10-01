import { Armchair, Cog, Droplet, Lightbulb, Sparkles, Wind, type LucideIcon } from "lucide-react";
import type { CarOption } from "@/config/business";
import { formatPrice } from "@/config/business";

const ICONS: Record<CarOption["icon"], LucideIcon> = {
  armchair: Armchair,
  leather: Droplet,
  engine: Cog,
  wind: Wind,
  sparkles: Sparkles,
  headlight: Lightbulb,
};

/** Une option sur la ligne éditoriale : icône fine, libellé, supplément. */
export function OptionItem({ option, index }: { option: CarOption; index: number }) {
  const Icon = ICONS[option.icon];
  return (
    <li className="flex h-full flex-col justify-between gap-10 border-b border-ink/10 py-8 lg:border-b-0 lg:border-l lg:px-6 lg:py-2 lg:first:border-l-0 lg:first:pl-0">
      <div className="flex items-start justify-between gap-4">
        <Icon aria-hidden strokeWidth={1} className="h-6 w-6 text-gold-deep" />
        <span className="eyebrow text-ink/45">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div>
        <p className="text-[0.95rem] leading-snug text-ink/85">{option.label}</p>
        <p className="mt-3 font-serif text-3xl font-light">
          {option.price === null ? <em className="text-2xl">Sur devis</em> : `+${formatPrice(option.price)}`}
        </p>
      </div>
    </li>
  );
}
