import Link from "next/link";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";
import { Commitments } from "@/components/sections/Commitments";
import { CTASection } from "@/components/sections/CTASection";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Nos services",
  description:
    "Nettoyage automobile, conciergerie pour maisons et appartements, locations Airbnb, bureaux, flottes et ambulances : les services Djeli Prestige à Paris & alentours.",
  path: "/services",
});

const POSITIONS: Record<string, string> = {
  automobile: "40% 50%",
  habitation: "60% 50%",
  airbnb: "35% 50%",
  professionnels: "62% 50%",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="/images/05-flotte.webp"
        alt="Plusieurs véhicules noirs entretenus simultanément devant un bâtiment contemporain"
        label="Services — Djeli Prestige"
        lines={["Quatre univers.", <em key="2" className="font-light">Une même exigence.</em>]}
        intro="Automobile, habitation, locations courte durée et professionnels : des services pensés pour simplifier le quotidien."
        position="70% 50%"
        positionDesktop="50% 50%"
      />

      <section aria-labelledby="univers-title" className="bg-ivory text-ink">
        <div className="gutter container-wide py-28 lg:py-40">
          <SectionLabel tone="muted" className="text-gold-deep">
            Index des services
          </SectionLabel>
          <h2 id="univers-title" className="sr-only">
            Nos univers de services
          </h2>

          <div className="mt-16 space-y-28 lg:mt-24 lg:space-y-40">
            {business.services.map((s, i) => {
              const reverse = i % 2 === 1;
              return (
                <article key={s.id} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
                  <div
                    className={cn(
                      reverse ? "lg:order-2 lg:col-span-6 lg:col-start-7" : "lg:col-span-7",
                      i === 1 && "w-[80%] lg:w-auto",
                      i === 2 && "ml-auto w-[90%] lg:ml-0 lg:w-auto",
                    )}
                  >
                    <Link href={s.href} tabIndex={-1} aria-hidden className="block">
                      <ImageReveal
                        src={s.image}
                        alt=""
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        position={POSITIONS[s.id]}
                        from={reverse ? "right" : "left"}
                        hoverZoom
                        className={cn(
                          "rounded-[2px]",
                          i === 0 && "aspect-[16/10]",
                          i === 1 && "aspect-[4/5] lg:aspect-[5/6]",
                          i === 2 && "aspect-[4/3]",
                          i === 3 && "aspect-[16/9]",
                        )}
                      />
                    </Link>
                  </div>
                  <Reveal
                    className={cn(reverse ? "lg:order-1 lg:col-span-5" : "lg:col-span-4 lg:col-start-9")}
                    delay={0.1}
                  >
                    <p className="font-serif text-6xl font-light text-gold-deep">{s.number}</p>
                    <h3 className="display-md mt-6">
                      <Link href={s.href} className="transition-colors hover:text-gold-deep">
                        {s.title}
                      </Link>
                    </h3>
                    <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ink/70">{s.summary}</p>
                    <ul className="mt-8 grid grid-cols-1 border-t border-ink/10 sm:grid-cols-2">
                      {s.items.map((item) => (
                        <li key={item} className="border-b border-ink/10 py-3 text-sm text-ink/75 sm:pr-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <TextLink href={s.href} arrow="up-right" className="mt-8 text-ink">
                      Découvrir
                    </TextLink>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Commitments number="" />
      <CTASection />
    </>
  );
}
