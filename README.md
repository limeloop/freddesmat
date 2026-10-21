# Freddes Mat

Webbplats för Freddes Mat – dagens lunch och catering i Härnösand.

**Stack:** [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router, Vite 8) · [Tailwind CSS v4](https://tailwindcss.com) · TypeScript.
Alla sidor förrenderas till statisk HTML vid bygget. Den enda serverkoden är offertformulärets serverfunktion.

```bash
npm install
npm run dev        # utvecklingsserver på http://localhost:4387
npm run build      # produktionsbygge till .output/
npm run preview    # förhandsvisa bygget
npm run typecheck  # TypeScript
```

Kräver Node 22.12 eller senare.

## Uppdatera veckans lunch

Allt finns i **`src/data/lunch.ts`**. Ändra veckonumret, datumen (ÅÅÅÅ-MM-DD) och rätterna, och pusha sedan.
Vercel bygger om sajten automatiskt.

- Dagens rätter markeras automatiskt med ”Idag” i veckomenyn.
- Dagens rätter visas också i kortet i heron på startsidan.
- Priserna står i samma fil (`lunchPrices`).

Menyn är riktig HTML-text, så den indexeras av Google. Ingen PDF behövs.

## Struktur

```
src/
  routes/              Sidor (filbaserad routing)
    __root.tsx         Dokument, <head>, header och footer
    index.tsx          Startsida
    catering.tsx       Cateringmenyn
    om-oss.tsx
    kontakt.tsx
  components/          Header, footer, hero, veckomeny, cateringmeny, offertformulär …
  data/
    lunch.ts           Veckans lunch och priser ← ändras varje vecka
    catering.ts        Hela cateringmenyn (typad)
    site.ts            Kontaktuppgifter, öppettider, meny
  server/offert.ts     Serverfunktion som skickar offertförfrågningar
  lib/use-today.ts     Dagens datum utan hydreringskrockar
  styles.css           Tailwind-tema: färger, typsnitt, återanvändbara klasser
public/                Bilder, typsnitt, robots.txt, sitemap.xml
```

## Modern webbplattform

- **Tailwind v4** med designsystemet i `@theme` i `styles.css`. Färgerna är angivna i oklch:
  röd `#E30613`, nästan svart `#171717`, varmvit `#FAFAF7` och ljusgrå `#F2F2F0`.
- **Inrörelser vid scroll** och den **genomskinliga headern** på startsidan använder CSS scroll-driven
  animations, utan JavaScript. Webbläsare utan stöd visar allt direkt och får en svart header.
- **Mobilmenyn** använder Popover API och fungerar utan JavaScript.
- **Sidbyten** använder View Transitions.
- **Typsnitten** Bebas Neue, Instrument Sans (variabel) och Kaushan Script ligger självhostade i `public/fonts`.
- **SEO:** sidtitlar och beskrivningar per route, Open Graph, kanoniska länkar, JSON-LD (`Restaurant`),
  sitemap och robots.txt.

## Offertformuläret

Formuläret anropar serverfunktionen `sendOffert` (`src/server/offert.ts`). Funktionen validerar fälten och
skickar e-post via [Resend](https://resend.com) när följande miljövariabler är satta i Vercel:

```
RESEND_API_KEY=...
OFFERT_FROM="Freddes Mat <offert@freddesmat.se>"   # en avsändare/domän verifierad i Resend
OFFERT_TO=fredrik.ostrom@live.se                   # valfri, detta är standard
```

Utan nycklarna öppnas besökarens e-postprogram med förfrågan ifylld, så formuläret fungerar redan nu.
Formuläret har också en dold honungsfälla mot spam.

## Driftsättning (Vercel)

Importera repot i Vercel. TanStack Start och Nitro upptäcks automatiskt, så ingen extra konfiguration behövs.
`vercel.json` skickar vidare gamla adresser (`/julbord`, `/nyar`, `*.html`) till de nya sidorna.

## Innehåll att kontrollera

| Uppgift | Källa | Status |
|---|---|---|
| Lunchmeny v.43 | Lunchaffischen | Inlagd exakt som affischen |
| Lunchpriser 130 / 110 / 95 kr | Facebook-affisch 21/10 | Bekräftade |
| E-post fredrik.ostrom@live.se | Nuvarande sajt | **Kontrollera** – Facebook anger koket@freddesmat.se |
| Cateringpriser | Cateringmeny 2021 (PDF) | **Kontrollera** – står markerat på sidan |
| Julmeny | Julmeny 2025 (PDF) | **Uppdatera till 2026** |
| Chaufförernas namn | Facebook-inlägg | Kontrollera att de vill synas |

Alla foton är Freddes Mats egna och kommer från Facebook-sidan. De är mobilbilder, så högupplösta
originalbilder skulle lyfta sajten ytterligare.
