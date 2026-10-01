import { Suspense } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { business } from "@/config/business";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = pageMetadata({
  title: "Contact & devis",
  description:
    "Contactez Djeli Prestige pour un devis : conciergerie, nettoyage automobile, Airbnb et services aux professionnels à Paris & alentours.",
  path: "/contact",
});

const channels = [
  { label: "Téléphone", value: business.phone, href: business.phoneHref, icon: Phone, external: false },
  { label: "WhatsApp", value: business.whatsappDisplay, href: business.whatsapp, icon: MessageCircle, external: true },
  { label: "E-mail", value: business.email, href: business.emailHref, icon: Mail, external: false },
];

export default function ContactPage() {
  return (
    <section aria-labelledby="page-title" className="bg-ivory text-ink">
      <div className="gutter container-wide grid gap-20 pt-40 pb-28 lg:grid-cols-12 lg:gap-12 lg:pt-52 lg:pb-40">
        <div className="lg:col-span-5">
          <p className="eyebrow text-gold-deep">Contact — Devis</p>
          <AnimatedText
            as="h1"
            id="page-title"
            immediate
            delay={0.3}
            className="display-xl mt-8"
            lines={["Parlons de", <em key="2" className="font-light text-gold-deep">votre besoin.</em>]}
          />
          <Reveal className="mt-12 max-w-sm" delay={0.5}>
            <p className="text-[0.95rem] leading-relaxed text-ink/70">
              Décrivez-nous votre demande : nous revenons vers vous avec une proposition adaptée.
            </p>
          </Reveal>

          <Reveal className="mt-16" delay={0.6}>
            <ul id="coordonnees" className="border-t border-ink/15">
              {channels.map(({ label, value, href, icon: Icon, external }) => (
                <li key={label} className="border-b border-ink/15">
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex min-h-16 items-center gap-5 py-5"
                  >
                    <Icon aria-hidden strokeWidth={1} className="h-5 w-5 text-gold-deep" />
                    <span className="eyebrow w-24 text-ink/55">{label}</span>
                    <span className="font-serif text-xl break-all transition-colors duration-500 group-hover:text-gold-deep sm:text-2xl">
                      {value}
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex min-h-16 items-center gap-5 border-b border-ink/15 py-5">
                <MapPin aria-hidden strokeWidth={1} className="h-5 w-5 text-gold-deep" />
                <span className="eyebrow w-24 text-ink/55">Zone</span>
                <span className="font-serif text-xl sm:text-2xl">{business.location}</span>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <Reveal delay={0.4}>
            <h2 className="eyebrow text-ink/60">Formulaire de demande</h2>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
