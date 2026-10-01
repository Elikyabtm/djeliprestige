import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-black text-paper">
      <div className="gutter container-wide flex min-h-[90svh] flex-col justify-end pt-40 pb-24">
        <p className="eyebrow text-gold">Erreur 404</p>
        <h1 className="display-xl mt-8">
          Page <em className="font-light">introuvable.</em>
        </h1>
        <p className="mt-8 max-w-md text-paper/70">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
        <ButtonLink href="/" variant="light" className="mt-10 self-start">
          Retour à l&apos;accueil
        </ButtonLink>
      </div>
    </section>
  );
}
