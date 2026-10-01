import { business } from "@/config/business";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Chapter = (typeof business.professionalChapters)[number];

type ProfessionalSectionProps = {
  chapter: Chapter;
  layout: "image-left" | "image-right" | "panorama";
  headingLevel?: "h3" | "h2";
};

/** Un chapitre photographique professionnel : rythme architectural, pas de card. */
export function ProfessionalSection({ chapter, layout, headingLevel = "h3" }: ProfessionalSectionProps) {
  const Heading = headingLevel;

  const text = (
    <div>
      <p className="font-serif text-[clamp(4rem,8vw,7rem)] leading-none font-light text-gold/80 outline-text">
        {chapter.number}
      </p>
      <p className="eyebrow mt-6 text-gold">Chapitre {chapter.number}</p>
      <Heading className="display-sm mt-4 max-w-[14ch]">{chapter.title}</Heading>
      <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-paper/70">{chapter.text}</p>
      <p className="eyebrow mt-8 flex items-center gap-4 text-paper">
        <span aria-hidden className="h-px w-10 bg-gold" />
        Sur devis
      </p>
    </div>
  );

  if (layout === "panorama") {
    return (
      <article className="relative">
        <ImageReveal
          src={chapter.image}
          alt={chapter.imageAlt}
          sizes="100vw"
          position="62% 50%"
          className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]"
          parallax={8}
        />
        <div className="gutter container-wide">
          <Reveal className="relative -mt-24 ml-auto max-w-lg bg-black p-8 pr-0 sm:-mt-40 md:p-12 md:pr-0 lg:-mt-56 lg:pl-14">
            {text}
          </Reveal>
        </div>
      </article>
    );
  }

  const left = layout === "image-left";
  return (
    <article className="grid items-center gap-12 lg:grid-cols-12 lg:gap-0">
      <div className={cn("lg:col-span-8", left ? "lg:order-1" : "lg:order-2 lg:col-start-5 lg:row-start-1")}>
        <ImageReveal
          src={chapter.image}
          alt={chapter.imageAlt}
          sizes="(min-width: 1024px) 66vw, 100vw"
          position={chapter.id === "ambulances" ? "68% 50%" : "50% 50%"}
          from={left ? "left" : "right"}
          className="aspect-[4/3] lg:aspect-[16/11]"
        />
      </div>
      <div
        className={cn(
          "gutter lg:col-span-4 lg:px-[4vw]",
          left ? "lg:order-2" : "lg:order-1 lg:col-start-1 lg:row-start-1",
        )}
      >
        <Reveal delay={0.1}>{text}</Reveal>
      </div>
    </article>
  );
}
