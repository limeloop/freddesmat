# Freddes Mat – ny webbplats

Statisk webbplats (HTML, CSS och lite JavaScript – inga ramverk, ingen byggprocess).

```
index.html        Startsida (hero, intro, veckans lunch, catering, jul, kontakt)
catering.html     Hela cateringmenyn som text (från PDF:erna)
om-oss.html       Om oss
kontakt.html      Kontaktuppgifter + offertformulär
assets/css/main.css   Designsystem – färger, typsnitt och mått som variabler i :root
assets/js/main.js     Mobilmeny, "Idag"-markering i lunchmenyn, formulär, inrörelser
assets/fonts/         Självhostade typsnitt (woff2)
assets/img/           Logotyp och foton (webp)
```

Förhandsvisa lokalt: `python3 -m http.server 4387` i mappen och öppna http://localhost:4387.

## Uppdatera veckans lunch (varje vecka)

Allt finns i `index.html`, i blocket som börjar med kommentaren `VECKANS LUNCH`.

1. Ändra rubriken `Lunchmeny v.43` och raden med datum (`Måndag 19 – fredag 23 oktober`).
2. På varje dag: ändra `data-date="2026-10-19"` (ÅÅÅÅ-MM-DD) och datumet `19/10`.
   `data-date` gör att dagens rätter automatiskt markeras med ”Idag”.
3. Byt ut texten i de två `<li class="dish">` per dag.
4. Priserna står i kortet till höger (`Pris`) och ändras bara när de ändras.

Menyn är vanlig HTML-text – den syns direkt, går att markera och indexeras av Google. Ingen PDF behövs.

## Identitet

- **Färger:** röd `#E30613`, nästan svart `#171717`, varmvit `#FAFAF7`, ljusgrå `#F2F2F0`, vit.
- **Logotyp:** befintlig PNG från freddesmat.se (vit text + röd stekpanna, transparent). Eftersom texten är vit
  ligger loggan alltid på mörk bakgrund (header och footer). Loggan är oförändrad.
- **Typsnitt:** Valda efter referensen Materiet, som använder Bebas Neue (rubriker), Instrument Sans (text) och
  ett handskrivet accenttypsnitt. Här: **Bebas Neue** + **Instrument Sans** + **Kaushan Script** (sparsamt, rött –
  ekar Freddes Mats logga och lunchaffischer). Alla har fri licens (SIL OFL) och ligger självhostade.
  *Avvikelse:* nuvarande sajt använder Roboto Condensed. Vill ni tillbaka: ändra `--display`/`--body` i `:root`.

## Bildmaterial

Alla foton är Freddes Mats egna, hämtade från Facebook-sidan (facebook.com/freddesmat.se): personalbild,
rostbiffat, snittar, wraps, salladsbuffé, lunchlådor, ostbrickor, smörgåsfat m.m. Bilderna från nuvarande
sajten (Höga kusten-bron, festbord och salladsbar) är stockfoton och används inte.
Kartbilden kommer från nuvarande sajt. Fotona är mobilbilder i ca 1–3 MP – med några högupplösta
originalfoton (särskilt liggande format) skulle sajten lyfta ytterligare.

## Innehåll och källor – att kontrollera

| Uppgift | Källa | Status |
|---|---|---|
| Lunchmeny v.43 | Lunchaffischen (bild från er + PDF på nuvarande sajt) | Inlagd exakt som affischen |
| Lunchpris 130 / pensionär 110 / avhämtning 95 kr | Facebook-affisch ”Dagens lunchbuffé” 21/10 | Bekräftad |
| Lunch mån–fre 10.30–13.00, övrig tid beställning | Nuvarande sajt + affisch | Bekräftad |
| Telefon 0611-201 22, 070-328 02 06 | Nuvarande sajt | Bekräftad |
| E-post fredrik.ostrom@live.se | Nuvarande sajt | **Kontrollera** – Facebook anger koket@freddesmat.se |
| Adress Sälstensgränd 133, 871 30 Härnösand | Nuvarande sajt | Bekräftad (Facebook: ”Gamla Ka5-området”) |
| Cateringmeny med priser | Cateringmeny 2021 (PDF) | **Kontrollera priser** – markerat på sidan |
| Julmeny med priser | Julmeny 2025 (PDF) | **Uppdatera till 2026** när den finns |
| Chaufförerna Sten-Inge Ek och Stefan Fröberg | Facebook-inlägg | Kontrollera att de vill synas med namn |

Ej överfört: påsk-, student- och nyårsmenyerna i 2021-PDF:en (gamla datum). Nyårsmeny 2025-PDF:en på
nuvarande sajt går inte att öppna (Access Denied hos Contentful).

## Offertformuläret

Formuläret i `kontakt.html` fungerar direkt utan server: när besökaren skickar öppnas deras e-postprogram
med en färdigifylld förfrågan till `data-mailto` (fredrik.ostrom@live.se).

För att skicka direkt från sidan i stället (rekommenderas): skapa ett formulär hos t.ex. Formspree eller
motsvarande tjänst och lägg till endpointen på formuläret:

```html
<form class="form" data-offert data-endpoint="https://formspree.io/f/XXXXXXX" ...>
```

JavaScript skickar då via `fetch` och visar ett tackmeddelande. Det finns en dold honungsfälla mot spam.

## Teknik och SEO

- Semantisk HTML, sidtitlar och metabeskrivningar per sida, Open Graph, `sitemap.xml`, `robots.txt`
  och strukturerad data (`Restaurant`, med adress, telefon och öppettider) på startsidan.
- Bilder i webp med `width`/`height` och lazy loading. Typsnitt förladdas.
- Rörelser respekterar `prefers-reduced-motion`. Sidan fungerar utan JavaScript.
- Nuvarande sajt är byggd i Gatsby + Contentful. Källkoden fanns inte i projektet, så den nya sajten är
  fristående. Vill ni redigera lunchen via Contentful kan blocket kopplas dit i ett senare steg.
