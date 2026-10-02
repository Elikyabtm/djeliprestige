# Djeli Prestige — site web

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

- Toutes les informations commerciales (téléphone, e-mail, tarifs, services, navigation) : `src/config/business.ts`.
- Informations juridiques (raison sociale, SIRET, siège, hébergeur, durée de conservation…) : `src/config/legal.ts` — seul fichier à compléter pour les pages légales.
- Photographies : `public/images/01-hero.webp` … `08-bureaux.webp`.
- Avant / après et témoignages : désactivés tant que de vrais contenus ne sont pas ajoutés (voir `business.features`).

## Formulaire de contact (envoi automatique)

Les demandes sont envoyées par e-mail via `src/app/api/contact/route.ts`, au choix :

- **Resend (recommandé)** : créer un compte sur https://resend.com avec `djeliprestige@gmail.com`,
  générer une clé API, puis définir `RESEND_API_KEY`.
- **Gmail SMTP** : activer la validation en deux étapes, créer un mot de passe d'application,
  puis définir `SMTP_USER` et `SMTP_PASS`.

En local : copier `.env.example` en `.env.local`. Sur Vercel : Settings → Environment Variables,
puis redéployer. Sans configuration, le formulaire affiche le téléphone et l'e-mail en secours.
