import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '~/components/PageHero'
import { OffertForm } from '~/components/OffertForm'
import { site } from '~/data/site'

const title = 'Kontakt och offert – Freddes Mat, Härnösand'
const description =
  'Kontakta Freddes Mat för offert på catering eller frågor om dagens lunch. Telefon 0611-201 22. Sälstensgränd 133, Härnösand.'

export const Route = createFileRoute('/kontakt')({
  head: () => ({
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: `${site.url}/img/smorgasfat.webp` },
    ],
    links: [{ rel: 'canonical', href: `${site.url}/kontakt` }],
  }),
  component: ContactPage,
})

const row = 'grid gap-1 border-b border-line py-5.5 md:grid-cols-[140px_1fr] md:gap-4'
const term = 'pt-1.5 text-xs font-semibold tracking-[0.18em] text-muted uppercase'

function ContactPage() {
  return (
    <>
      <PageHero crumb="Kontakt" kicker="Kontakt & offert" title="Kontakta oss">
        <p className="lead">
          Kontakta oss för pris och offert eller för att beställa catering. Lunch serveras måndag–fredag 10.30–13.00 – övrig tid
          är det öppet för beställning.
        </p>
      </PageHero>

      <section aria-label="Kontaktuppgifter och offertförfrågan" className="pb-(--section)">
        <div className="wrap grid items-start gap-[clamp(32px,6vw,96px)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal">
            <dl className="border-t-2 border-ink">
              <div className={row}>
                <dt className={term}>Telefon</dt>
                <dd>
                  {site.phones.map((p) => (
                    <a key={p.href} href={p.href} className="block font-display text-[clamp(34px,3vw,44px)] leading-[1.05] tracking-[0.01em] hover:text-red">
                      {p.label}
                    </a>
                  ))}
                </dd>
              </div>
              <div className={row}>
                <dt className={term}>E-post</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="border-b-[1.5px] border-red hover:text-red">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className={row}>
                <dt className={term}>Besök oss</dt>
                <dd>
                  {site.place}
                  <br />
                  {site.street}
                  <br />
                  {site.postalCode} {site.city}
                </dd>
              </div>
              <div className={row}>
                <dt className={term}>Öppettider</dt>
                <dd>
                  <strong>{site.hours.lunchLong}</strong> för lunch.
                  <br />
                  {site.hours.other}
                </dd>
              </div>
              <div className={row}>
                <dt className={term}>Följ oss</dt>
                <dd>
                  <a href={site.facebook} target="_blank" rel="noopener" className="border-b-[1.5px] border-red hover:text-red">
                    Facebook ↗
                  </a>{' '}
                  – här lägger vi upp veckans lunchmeny.
                </dd>
              </div>
            </dl>

            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener"
              className="group relative mt-7 block overflow-hidden rounded-panel border border-line"
            >
              <img
                src="/img/karta.webp"
                width={824}
                height={696}
                loading="lazy"
                alt="Karta över Kusthöjden i Härnösand där Freddes Mat är markerat"
                className="aspect-16/10 w-full object-cover grayscale-[0.15] transition-transform duration-800 ease-brand group-hover:scale-103"
              />
              <span className="btn btn-sm btn-ink absolute bottom-4 left-4">Öppna i Google Maps ↗</span>
            </a>
          </div>

          <div id="offert" className="reveal scroll-mt-[calc(var(--header-h)+16px)] rounded-panel border border-line bg-white p-[clamp(28px,4vw,48px)]">
            <p className="kicker">Offertförfrågan</p>
            <h2 className="display h-md mb-2.5">Begär offert</h2>
            <p className="mb-7 text-muted">
              Berätta kort om ert arrangemang så återkommer vi. Har du speciella önskemål och behov? Skriv dem i meddelandet.
            </p>
            <OffertForm />
          </div>
        </div>
      </section>
    </>
  )
}
