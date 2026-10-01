import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "light" | "dark" | "ghost-light" | "ghost-dark";

const VARIANTS: Record<Variant, string> = {
  // PRIMARY LIGHT — fond ivoire, texte noir
  light: "bg-ivory text-ink hover:bg-white border border-ivory",
  // PRIMARY DARK — fond noir, texte blanc
  dark: "bg-black text-paper hover:bg-charcoal border border-black",
  // Contours fins, utilisés comme second CTA
  "ghost-light": "border border-paper/35 text-paper hover:border-gold hover:text-gold-light",
  "ghost-dark": "border border-ink/25 text-ink hover:border-gold-deep hover:text-gold-deep",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  arrow?: "right" | "up-right" | "none";
  children: ReactNode;
};

export function ButtonLink({
  variant = "light",
  className,
  arrow = "right",
  children,
  ...props
}: ButtonLinkProps) {
  const Icon = arrow === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] px-7 py-3.5 text-[0.72rem] font-medium tracking-[0.22em] uppercase transition-colors duration-500 ease-[var(--ease-prestige)]",
        VARIANTS[variant],
        className,
      )}
    >
      <span>{children}</span>
      {arrow !== "none" ? (
        <Icon
          aria-hidden
          strokeWidth={1.25}
          className={cn(
            "h-4 w-4 transition-transform duration-500 ease-[var(--ease-prestige)]",
            arrow === "up-right"
              ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              : "group-hover:translate-x-1",
          )}
        />
      ) : null}
    </Link>
  );
}

type TextLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  arrow?: "right" | "up-right";
  children: ReactNode;
};

/** TEXT LINK — texte + flèche, underline qui se déploie. */
export function TextLink({ className, arrow = "right", children, ...props }: TextLinkProps) {
  const Icon = arrow === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex min-h-11 items-center gap-3 text-[0.72rem] font-medium tracking-[0.22em] uppercase",
        className,
      )}
    >
      <span className="relative pb-1">
        {children}
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-[0.35] bg-current transition-transform duration-700 ease-[var(--ease-prestige)] group-hover:scale-x-100"
        />
      </span>
      <Icon
        aria-hidden
        strokeWidth={1.25}
        className={cn(
          "h-4 w-4 text-gold transition-transform duration-500 ease-[var(--ease-prestige)]",
          arrow === "up-right"
            ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            : "group-hover:translate-x-1",
        )}
      />
    </Link>
  );
}
