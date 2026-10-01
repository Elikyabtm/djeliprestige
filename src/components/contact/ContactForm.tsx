"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Fields = ContactFields;
type Errors = ContactErrors;

const SERVICE_FROM_QUERY: Record<string, string> = {
  conciergerie: "Conciergerie",
  airbnb: "Airbnb / location",
  automobile: "Nettoyage automobile",
  professionnels: "Professionnels",
};

/**
 * Formulaire de demande — envoi automatique via /api/contact
 * (e-mail adressé à business.email).
 */
export function ContactForm() {
  const params = useSearchParams();

  const initial = useMemo<Fields>(() => {
    const formule = business.pricing.find((p) => p.id === params.get("formule"));
    const service = SERVICE_FROM_QUERY[params.get("service") ?? ""] ?? "";
    const pro = params.get("profil") === "professionnel";
    return {
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      profil: pro ? "Professionnel" : "Particulier",
      service: pro && !service ? "Professionnels" : service,
      message: formule ? `Je souhaite réserver la formule ${formule.name} (${formule.description}).\n` : "",
    };
  }, [params]);

  const [fields, setFields] = useState<Fields>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const [trap, setTrap] = useState("");

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (status === "sending") return;
    const e = validateContact(fields);
    setErrors(e);
    const firstError = Object.keys(e)[0];
    if (firstError) {
      document.getElementById(`field-${firstError}`)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website: trap }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: Errors };
      if (res.ok && data.ok) {
        setStatus("sent");
        setFields({ ...initial, message: "" });
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.error ?? "Votre demande n'a pas pu être envoyée.");
      setStatus("error");
    } catch {
      setServerError("Connexion impossible. Vérifiez votre connexion internet.");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="text-ink" aria-describedby="form-note">
      {/* Champ piège anti-spam : masqué aux humains et aux lecteurs d'écran */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="field-website">Ne pas remplir</label>
        <input
          id="field-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>
      <div className="grid gap-x-8 sm:grid-cols-2">
        <Field id="nom" label="Nom" value={fields.nom} onChange={set("nom")} error={errors.nom} autoComplete="family-name" required />
        <Field id="prenom" label="Prénom" value={fields.prenom} onChange={set("prenom")} error={errors.prenom} autoComplete="given-name" required />
        <Field id="telephone" label="Téléphone" type="tel" value={fields.telephone} onChange={set("telephone")} error={errors.telephone} autoComplete="tel" inputMode="tel" />
        <Field id="email" label="E-mail" type="email" value={fields.email} onChange={set("email")} error={errors.email} autoComplete="email" />
      </div>

      <fieldset className="mt-10">
        <legend className="eyebrow text-ink/60">Je suis</legend>
        <div className="mt-4 flex gap-3">
          {business.contactForm.profiles.map((p) => {
            const checked = fields.profil === p;
            return (
              <label
                key={p}
                className={cn(
                  "flex min-h-12 cursor-pointer items-center border px-6 text-[0.72rem] font-medium tracking-[0.2em] uppercase transition-colors duration-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-gold",
                  checked ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink/70 hover:border-ink/50",
                )}
              >
                <input
                  type="radio"
                  name="profil"
                  value={p}
                  checked={checked}
                  onChange={() => set("profil")(p)}
                  className="sr-only"
                />
                {p}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="eyebrow text-ink/60">
          Service <span aria-hidden className="text-gold-deep">*</span>
        </legend>
        <div className="mt-4 flex flex-wrap gap-2.5" id="field-service" tabIndex={-1}>
          {business.contactForm.services.map((s) => {
            const checked = fields.service === s;
            return (
              <label
                key={s}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center rounded-full border px-5 text-sm transition-colors duration-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-gold",
                  checked ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink/75 hover:border-ink/50",
                )}
              >
                <input
                  type="radio"
                  name="service"
                  value={s}
                  checked={checked}
                  onChange={() => set("service")(s)}
                  className="sr-only"
                  aria-describedby={errors.service ? "error-service" : undefined}
                />
                {s}
              </label>
            );
          })}
        </div>
        <ErrorText id="error-service" message={errors.service} />
      </fieldset>

      <div className="mt-10">
        <label htmlFor="field-message" className="eyebrow text-ink/60">
          Message <span aria-hidden className="text-gold-deep">*</span>
        </label>
        <textarea
          id="field-message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={(e) => set("message")(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "error-message" : undefined}
          className="mt-3 w-full resize-y border-b border-ink/25 bg-transparent py-3 text-base leading-relaxed outline-none transition-colors placeholder:text-ink/35 focus:border-ink"
          placeholder="Votre véhicule, votre logement, vos locaux, vos disponibilités…"
        />
        <ErrorText id="error-message" message={errors.message} />
      </div>

      <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
          className="group disabled:cursor-wait disabled:opacity-70 inline-flex min-h-14 items-center justify-center gap-4 bg-black px-9 text-[0.74rem] font-medium tracking-[0.22em] text-paper uppercase transition-colors duration-500 hover:bg-charcoal"
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
          <ArrowRight aria-hidden strokeWidth={1.25} className="h-4 w-4 text-gold transition-transform duration-500 group-hover:translate-x-1" />
        </button>
        <p id="form-note" className="max-w-xs text-xs leading-relaxed text-ink/55">
          Votre demande nous est transmise directement. Nous revenons vers vous rapidement.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.p
            key="sent"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-8 border-l border-gold-deep pl-4 text-sm text-ink/80"
          >
            Merci, votre demande a bien été envoyée. Nous vous recontactons au plus vite.
          </motion.p>
        ) : null}
        {status === "error" ? (
          <motion.p
            key="error"
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mt-8 border-l border-red-800 pl-4 text-sm text-ink/80"
          >
            {serverError} Vous pouvez aussi nous écrire à{" "}
            <a href={business.emailHref} className="underline underline-offset-4">
              {business.email}
            </a>{" "}
            ou appeler le{" "}
            <a href={business.phoneHref} className="underline underline-offset-4">
              {business.phone}
            </a>
            .
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

type FieldProps = {
  id: keyof Fields;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
};

function Field({ id, label, value, onChange, error, type = "text", required, autoComplete, inputMode }: FieldProps) {
  return (
    <div className="pt-8">
      <label htmlFor={`field-${id}`} className="eyebrow text-ink/60">
        {label} {required ? <span aria-hidden className="text-gold-deep">*</span> : null}
      </label>
      <input
        id={`field-${id}`}
        name={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `error-${id}` : undefined}
        className={cn(
          "mt-2 h-12 w-full border-b bg-transparent text-base outline-none transition-colors focus:border-ink",
          error ? "border-red-800" : "border-ink/25",
        )}
      />
      <ErrorText id={`error-${id}`} message={error} />
    </div>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-xs text-red-800">
      {message}
    </p>
  );
}
