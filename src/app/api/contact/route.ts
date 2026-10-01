import nodemailer from "nodemailer";
import { business } from "@/config/business";
import { toContactFields, validateContact, type ContactFields } from "@/lib/contact";

/**
 * Envoi automatique du formulaire de contact par e-mail (SMTP).
 *
 * Variables d'environnement (voir .env.example) :
 *   SMTP_USER  — adresse Gmail expéditrice (ex. djeliprestige@gmail.com)
 *   SMTP_PASS  — mot de passe d'application Gmail (16 caractères)
 *   SMTP_HOST  — optionnel, défaut smtp.gmail.com
 *   SMTP_PORT  — optionnel, défaut 465
 *   CONTACT_TO — optionnel, destinataire ; défaut business.email
 */

export const runtime = "nodejs";

// Limitation simple par IP (au mieux : mémoire de l'instance).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

function buildEmail(f: ContactFields) {
  const rows: [string, string][] = [
    ["Nom", f.nom],
    ["Prénom", f.prenom],
    ["Téléphone", f.telephone || "—"],
    ["E-mail", f.email || "—"],
    ["Je suis", f.profil],
    ["Service", f.service],
  ];
  const text = [...rows.map(([k, v]) => `${k} : ${v}`), "", "Message :", f.message].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;color:#121212;max-width:600px">
      <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#7a5c2b">Nouvelle demande — site ${escapeHtml(business.businessName)}</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #eee;color:#666;width:120px">${escapeHtml(k)}</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:20px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(f.message)}</p>
    </div>`;
  return { text, html };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège anti-robots : invisible pour les humains.
  const trap = (body as Record<string, unknown> | null)?.website;
  if (typeof trap === "string" && trap.trim() !== "") {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Trop de demandes envoyées. Merci de réessayer un peu plus tard." },
      { status: 429 },
    );
  }

  const fields = toContactFields(body);
  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error("[contact] SMTP_USER / SMTP_PASS manquants : envoi impossible.");
    return Response.json({ ok: false, error: "L'envoi n'est pas encore configuré." }, { status: 503 });
  }

  const port = Number(process.env.SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const { text, html } = buildEmail(fields);
  try {
    await transporter.sendMail({
      from: `"${business.businessName} — Site web" <${user}>`,
      to: process.env.CONTACT_TO || business.email,
      replyTo: fields.email.trim() ? `"${oneLine(`${fields.prenom} ${fields.nom}`)}" <${fields.email.trim()}>` : undefined,
      subject: oneLine(`Demande de devis — ${fields.service} — ${fields.prenom} ${fields.nom}`),
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] Échec de l'envoi :", err);
    return Response.json({ ok: false, error: "L'envoi a échoué." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
