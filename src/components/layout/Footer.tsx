import Link from "next/link";
import { business } from "@/config/business";
import { Logo } from "@/components/ui/Logo";

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black text-paper">
      <div className="gutter container-wide pt-24 lg:pt-36">
        {/* Wordmark géant */}
        <p
          aria-hidden
          className="font-serif text-[clamp(4.5rem,19vw,19rem)] leading-[0.82] font-light tracking-[-0.03em] select-none"
        >
          Djeli
          <br />
          <span className="ml-[12vw] italic text-paper/90">Prestige</span>
        </p>

        <div className="mt-14 grid gap-14 border-t border-paper/10 pt-14 md:grid-cols-12 lg:mt-20">
          <div className="md:col-span-12 lg:col-span-4">
            <Logo />
            <p className="mt-8 max-w-xs font-serif text-2xl leading-snug font-light text-paper/85">
              {business.baseline}
            </p>
            <p className="eyebrow mt-8 text-gold">{business.tagline}</p>
          </div>

          <nav aria-label="Navigation du pied de page" className="md:col-span-3 lg:col-span-2">
            <h2 className="eyebrow mb-6 text-muted">Navigation</h2>
            <ul className="space-y-3 text-sm">
              {business.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/75 transition-colors hover:text-gold-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3 lg:col-span-2">
            <h2 className="eyebrow mb-6 text-muted">Services</h2>
            <ul className="space-y-3 text-sm">
              {business.services.map((s) => (
                <li key={s.id}>
                  <Link href={s.href} className="text-paper/75 transition-colors hover:text-gold-light">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h2 className="eyebrow mb-6 text-muted">Contact</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={business.phoneHref} className="text-paper/75 transition-colors hover:text-gold-light">
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={business.emailHref}
                  className="break-all text-paper/75 transition-colors hover:text-gold-light"
                >
                  {business.email}
                </a>
              </li>
              <li className="text-paper/75">{business.location}</li>
              {business.socialLinks.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="text-paper/75 hover:text-gold-light" rel="noopener noreferrer" target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h2 className="eyebrow mb-6 text-muted">Informations légales</h2>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-paper/75 transition-colors hover:text-gold-light">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-paper/10 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.businessName}
          </p>
          <p>
            Design & développement : {business.credits.designer}, {business.credits.role.toLowerCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
