# Djeli Prestige — site web

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

- Toutes les informations commerciales (téléphone, e-mail, tarifs, services, navigation) : `src/config/business.ts`.
- Photographies : `public/images/01-hero.webp` … `08-bureaux.webp`.
- Avant / après et témoignages : désactivés tant que de vrais contenus ne sont pas ajoutés (voir `business.features`).

## Formulaire de contact (envoi automatique)

Les demandes sont envoyées par e-mail via `src/app/api/contact/route.ts` (Gmail SMTP).

1. Sur le compte Google `djeliprestige@gmail.com` : activer la validation en deux étapes,
   puis créer un mot de passe d'application sur https://myaccount.google.com/apppasswords.
2. En local : copier `.env.example` en `.env.local` et renseigner `SMTP_USER` / `SMTP_PASS`.
3. Sur Vercel : Settings → Environment Variables → ajouter `SMTP_USER` et `SMTP_PASS`, puis redéployer.

Sans ces variables, le formulaire affiche un message d'erreur avec le téléphone et l'e-mail.
