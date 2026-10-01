import Link from "next/link";
import { business } from "@/config/business";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextLink } from "@/components/ui/Button";

const [auto, habitation, airbnb, pro] = business.services;

/**
 * Composition éditoriale façon portfolio d'architecture :
 * tailles, ratios et alignements volontairement différents.
 */
export function ServiceShowcase() {
  return (
    <section aria-labelledby="services-title" className="relative bg-ivory pb-24 text-ink lg:pb-32">
      <div className="gutter container-wide">
        <div className="grid gap-10 border-t border-ink/10 pt-20 md:grid-cols-12 lg:pt-28">
          <div className="md:col-span-8">
            <SectionLabel number="02" tone="muted" className="text-gold-deep">
              Nos services
            </SectionLabel>
            <AnimatedText
              as="h2"
              className="display-lg mt-10"
              lines={[
                <span key="1" id="services-title">
                  Un service pour
                </span>,
                <em key="2" className="font-light">
                  chaque besoin.
                </em>,
              ]}
            />
          </div>
          <Reveal className="self-end md:col-span-4 lg:col-span-3 lg:col-start-10" delay={0.15}>
            <p className="text-[0.95rem] leading-relaxed text-ink/70">
              Automobile, habitation, locations courte durée et professionnels : quatre univers,
              une même attention portée au détail.
            </p>
          </Reveal>
        </div>

        {/* 01 — Automobile : grande image horizontale ~58% */}
        <article className="mt-24 grid items-end gap-8 md:grid-cols-12 lg:mt-32">
          <Link
            href={auto.href}
            tabIndex={-1}
            aria-hidden
            className="block md:col-span-8 lg:col-span-7"
          >
            <ImageReveal
              src={auto.image}
              alt=""
              sizes="(min-width: 1024px) 58vw, (min-width: 768px) 66vw, 100vw"
              className="aspect-[16/11] rounded-[2px] md:aspect-[16/10]"
              position="40% 50%"
              from="left"
              hoverZoom
            />
          </Link>
          <Reveal className="md:col-span-4 lg:col-span-4 lg:col-start-9 lg:pb-6" delay={0.1}>
            <ServiceText service={auto} />
          </Reveal>
        </article>

        {/* 02 & 03 — Habitation (vertical) / Airbnb (intermédiaire, décalé) */}
        <div className="mt-28 grid gap-20 md:grid-cols-12 md:gap-8 lg:mt-44">
          <article className="w-[82%] md:col-span-5 md:w-auto lg:col-span-4 lg:col-start-2">
            <Link href={habitation.href} tabIndex={-1} aria-hidden className="block">
              <ImageReveal
                src={habitation.image}
                alt=""
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 82vw"
                className="aspect-[3/4] rounded-[2px]"
                position="62% 50%"
                hoverZoom
              />
            </Link>
            <Reveal className="mt-8" delay={0.1}>
              <ServiceText service={habitation} />
            </Reveal>
          </article>

          <article className="ml-auto w-[88%] md:col-span-6 md:col-start-7 md:mt-64 md:w-auto lg:col-span-6 lg:col-start-7 lg:mt-80">
            <Link href={airbnb.href} tabIndex={-1} aria-hidden className="relative block">
              <ImageReveal
                src={airbnb.image}
                alt=""
                sizes="(min-width: 768px) 50vw, 88vw"
                className="aspect-[4/3] rounded-[2px]"
                position="32% 50%"
                from="right"
                hoverZoom
              />
              {/* Titre posé partiellement sur l'image */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-5 left-5 font-serif text-[clamp(2rem,4vw,3.75rem)] leading-none font-light text-paper italic"
              >
                Airbnb
              </span>
            </Link>
            <Reveal className="mt-8 md:max-w-md" delay={0.1}>
              <ServiceText service={airbnb} />
            </Reveal>
          </article>
        </div>
      </div>

      {/* 04 — Professionnels : panoramique bord à bord avec bloc d'information superposé */}
      <article className="relative mt-28 lg:mt-44">
        <Link href={pro.href} tabIndex={-1} aria-hidden className="relative block">
          <ImageReveal
            src={pro.image}
            alt=""
            sizes="100vw"
            className="aspect-[4/3] md:aspect-[21/9]"
            position="62% 50%"
            parallax={8}
          />
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/45 to-transparent" />
          <span
            aria-hidden
            className="pointer-events-none absolute top-6 left-0 gutter font-serif text-[clamp(3rem,10vw,10rem)] leading-none font-light text-paper/90"
          >
            Professionnels
          </span>
        </Link>
        <div className="gutter container-wide">
          <Reveal className="relative -mt-16 ml-auto max-w-md bg-ivory p-8 md:-mt-28 md:p-12">
            <ServiceText service={pro} />
          </Reveal>
        </div>
      </article>
    </section>
  );
}

function ServiceText({ service }: { service: (typeof business.services)[number] }) {
  return (
    <div>
      <p className="eyebrow flex items-center gap-4 text-gold-deep">
        <span>{service.number}</span>
        <span aria-hidden className="h-px w-8 bg-current" />
      </p>
      <h3 className="display-sm mt-5">
        <Link href={service.href} className="transition-colors duration-500 hover:text-gold-deep">
          {service.title}
        </Link>
      </h3>
      <p className="mt-4 max-w-sm text-[0.92rem] leading-relaxed text-ink/70">{service.summary}</p>
      <TextLink href={service.href} arrow="up-right" className="mt-6 text-ink">
        Découvrir
      </TextLink>
    </div>
  );
}
