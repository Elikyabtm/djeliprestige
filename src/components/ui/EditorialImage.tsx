import Image from "next/image";
import { cn } from "@/lib/cn";

type EditorialImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  priority?: boolean;
  caption?: string;
};

/** Image statique (sans animation) avec zoom subtil au survol. */
export function EditorialImage({
  src,
  alt,
  sizes,
  className,
  position = "50% 50%",
  priority,
  caption,
}: EditorialImageProps) {
  return (
    <figure className={cn("group relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-prestige)] group-hover:scale-[1.03]"
        style={{ objectPosition: position }}
      />
      {caption ? (
        <figcaption className="eyebrow absolute bottom-4 left-4 text-paper/80">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
