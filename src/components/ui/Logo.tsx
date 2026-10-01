import Link from "next/link";
import { cn } from "@/lib/cn";
import { business } from "@/config/business";

type LogoProps = {
  className?: string;
  /** Afficher la ligne « Conciergerie ». */
  withBaseline?: boolean;
  onClick?: () => void;
};

/**
 * Wordmark temporaire Djeli Prestige.
 * Remplaçable par un SVG : conserver la même API (className / withBaseline).
 */
export function Logo({ className, withBaseline = true, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${business.businessName} — accueil`}
      className={cn("group inline-flex items-center gap-3.5", className)}
    >
      <span
        aria-hidden
        className="relative flex h-10 w-10 items-center justify-center border border-current/30 font-serif text-[1.05rem] tracking-[0.04em] transition-colors duration-500 group-hover:border-gold"
      >
        {/* Allusion quasi imperceptible à une couronne : trois points fins */}
        <span className="absolute -top-[3px] left-1/2 flex -translate-x-1/2 gap-[3px]">
          <span className="h-[3px] w-[3px] rotate-45 bg-gold/70" />
          <span className="h-[3px] w-[3px] rotate-45 bg-gold" />
          <span className="h-[3px] w-[3px] rotate-45 bg-gold/70" />
        </span>
        DP
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.78rem] font-medium tracking-[0.32em] uppercase">Djeli Prestige</span>
        {withBaseline ? (
          <span className="mt-1.5 text-[0.56rem] tracking-[0.42em] uppercase opacity-60">
            Conciergerie
          </span>
        ) : null}
      </span>
    </Link>
  );
}
