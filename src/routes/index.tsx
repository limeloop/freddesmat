import { Link, createFileRoute } from '@tanstack/react-router'
import { Stage } from '~/components/home/Stage'
import { Marquee } from '~/components/home/Marquee'
import { WeeklyLunch } from '~/components/home/WeeklyLunch'
import { site } from '~/data/site'

const title = 'Freddes Mat – Dagens lunch och catering i Härnösand'
const description =
  'Dagens lunch på Kafé 9:an, Kusthöjden i Härnösand – två rätter, salladsbuffé, kaffe och kaka. Catering och buffémat till bröllop, dop, firmafester och konferenser.'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: `${site.url}/img/hero-rostbiff.webp` },
    ],
    links: [
      { rel: 'canonical', href: `${site.url}/` },
      { rel: 'preload', href: '/img/hero-rostbiff.webp', as: 'image', media: '(min-width: 721px)', fetchPriority: 'high' },
      { rel: 'preload', href: '/img/hero-rostbiff-mobil.webp', as: 'image', media: '(max-width: 720px)', fetchPriority: 'high' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Restaurant',
          name: site.name,
          url: `${site.url}/`,
          logo: `${site.url}/img/freddes-mat-logo.png`,
          image: `${site.url}/img/hero-rostbiff.webp`,
          telephone: '+46611-20122',
          email: site.email,
          servesCuisine: ['Husmanskost', 'Buffé', 'Catering'],
          priceRange: '$$',
          address: {
            '@type': 'PostalAddress',
            streetAddress: site.street,
            postalCode: site.postalCode,
            addressLocality: site.city,
            addressCountry: 'SE',
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '10:30',
              closes: '13:00',
            },
          ],
          hasMenu: `${site.url}/catering`,
          sameAs: [site.facebook],
        }),
      },
    ],
  }),
  component: HomePage,
})

const cards = [
  { hash: 'buffeer', title: 'Bufféer', meta: 'Vår specialitet', src: '/img/rostbiff-tallrikar.webp', w: 910, h: 1800, alt: 'Fat med rostbiff, jordgubbar och apelsinblommor' },
  { hash: 'forratter', title: 'Förrätter', meta: 'Smakstarten', src: '/img/rakor.webp', w: 810, h: 1800, alt: 'Snittar med räkor och avokadoröra' },
  { hash: 'husmanskost', title: 'Husmanskost', meta: 'Fest & vardag', src: '/img/matlada.webp', w: 810, h: 1800, alt: 'Portionsförpackad husmanskost' },
  { hash: 'sallader', title: 'Sallader & quiche', meta: 'Fräscht', src: '/img/sallad.webp', w: 810, h: 1800, alt: 'Stor skål med sallad garnerad med en morotsblomma' },
  { hash: 'desserter', title: 'Desserter', meta: 'Söta avslutet', src: '/img/bakverk.webp', w: 1800, h: 810, alt: 'Bakverk med vispad grädde på röda brickor' },
] as const

const julPicks = [
  { name: 'Freddes klassiska jultallrik m småvarmt', price: 215 },
  { name: 'Julbuffé', note: 'minst 6 pers', price: 349 },
  { name: 'Julbord', note: 'minst 8 pers', price: 595 },
]

function HomePage() {
  return (
    <>
      <Stage />
      <Marquee />

      {/* Intro */}
      <section aria-labelledby="intro-titel" className="section-y">
        <div className="wrap">
          <div className="grid items-end gap-[clamp(32px,6vw,112px)] lg:grid-cols-[1.25fr_1fr]">
            <div className="reveal">
              <p className="kicker">Freddes Mat</p>
              <h2 id="intro-titel" className="display h-lg">
                God mat till livets alla tillfällen
              </h2>
              <p className="lead mt-6">
                Från vårt kök på fina Kusthöjden i Härnösand lagar vi mat till allt från små möten till stora tillfällen.
              </p>
            </div>
            <div className="reveal text-body">
              <p className="max-w-[30em]">
                Vår specialitet är buffémat – ett stort, varierat och fräscht utbud. Till vardags utgår vi från traditionell
                husmanskost som vi tillagar i köket på Kafé 9:an.
              </p>
              <p className="mt-4 max-w-[30em]">
                Och har du speciella önskemål? Hör av dig, så hjälper vi dig att sätta ihop det som passar just dig.
              </p>
              <Link to="/om-oss" className="link-arrow mt-4">
                Mer om oss <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <figure className="reveal relative mt-[clamp(48px,6vw,88px)]">
            <img
              src="/img/personalen.webp"
              width={1800}
              height={1188}
              loading="lazy"
              decoding="async"
              alt="Personalen på Freddes Mat i svarta tröjor med logotypen, i köket"
              className="aspect-[16/7.2] w-full rounded-panel object-cover object-[50%_42%] max-md:aspect-4/3"
            />
            <figcaption className="absolute right-5.5 bottom-5 flex items-center gap-2.5 rounded-full bg-white/90 px-4 py-2.5 text-[13px] font-medium backdrop-blur before:size-2 before:rounded-full before:bg-red max-md:hidden">
              Gänget bakom Freddes Mat
            </figcaption>
          </figure>
        </div>
      </section>

      <WeeklyLunch />

      {/* Catering */}
      <section aria-labelledby="catering-titel" className="section-y">
        <div className="wrap">
          <header className="mb-[clamp(44px,5vw,72px)] grid items-end gap-x-[clamp(32px,6vw,96px)] gap-y-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="reveal">
              <p className="kicker">Catering</p>
              <h2 id="catering-titel" className="display h-lg">
                Mat för alla tillfällen
              </h2>
            </div>
            <p className="lead reveal">
              Från bröllop och dop till firmafester och konferenser. Vår cateringmeny har ett brett utbud av förrätter,
              huvudrätter och desserter – låt oss sköta maten, så kan du koncentrera dig på allt annat.
            </p>
          </header>

          <div className="-mx-(--gutter) flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-(--gutter) [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-3.5 md:overflow-visible md:px-0 xl:grid-cols-5">
            {cards.map((card) => (
              <Link
                key={card.hash}
                to="/catering"
                hash={card.hash}
                className="group reveal relative isolate block aspect-3/4 flex-[0_0_72%] snap-start overflow-hidden rounded-card bg-ink-2 md:aspect-[3/4.3] md:max-xl:nth-[n+4]:aspect-16/10"
              >
                <img
                  src={card.src}
                  width={card.w}
                  height={card.h}
                  alt={card.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-900 ease-brand group-hover:scale-105"
                />
                <span aria-hidden className="absolute inset-x-0 top-[40%] bottom-0 -z-10 bg-linear-to-t from-black/80 to-transparent" />
                <span className="absolute inset-x-4.5 bottom-4 text-white">
                  <span className="block font-display text-[clamp(26px,2.1vw,34px)] leading-[0.95] uppercase">{card.title}</span>
                  <span className="mt-2 flex items-center justify-between text-xs font-medium tracking-[0.14em] text-white/75 uppercase">
                    {card.meta}
                    <span className="grid size-[30px] place-items-center rounded-full bg-white text-sm tracking-normal text-ink transition-colors group-hover:bg-red group-hover:text-white">
                      →
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Budskap */}
      <section aria-label="Porslin" className="bg-white py-[clamp(72px,9vw,140px)] text-center">
        <div className="wrap reveal">
          <p className="font-display text-[clamp(52px,8.6vw,148px)] leading-[0.88] uppercase">
            Behöver ni porslin?
            <span className="script mt-[0.08em] block text-[0.62em] leading-[1.1]">Lugnt, det fixar vi!</span>
          </p>
          <p className="mx-auto mt-2 max-w-[34em] text-muted">Maten kommer färdig – det är bara att ställa fram och njuta.</p>
        </div>
      </section>

      {/* Säsong */}
      <section aria-labelledby="jul-titel" className="section-y">
        <div className="wrap">
          <div className="reveal grid overflow-hidden rounded-panel bg-red text-white lg:grid-cols-2">
            <img
              src="/img/smorgasfat.webp"
              width={1800}
              height={1251}
              loading="lazy"
              decoding="async"
              alt="Fat med smörgåsar, ägghalvor, köttbullar och pålägg"
              className="size-full object-cover max-lg:aspect-16/10 lg:min-h-[420px]"
            />
            <div className="flex flex-col justify-center p-[clamp(36px,5vw,72px)]">
              <p className="kicker text-white/85! before:bg-white!">Julmat</p>
              <h2 id="jul-titel" className="display h-md">
                Slipp stöket – vi fixar julmaten
              </h2>
              <p className="mt-4 max-w-[30em] text-white/90">
                Vi levererar julmat från och med vecka 46 ända fram till dagen innan julafton, den 23 december. Duka fram, ät och
                njut med nära och kära.
              </p>
              <ul className="mt-2 mb-5.5 border-t border-white/30">
                {julPicks.map((item) => (
                  <li key={item.name} className="flex justify-between gap-4 border-b border-white/30 py-2.5 text-[15.5px]">
                    <span>
                      {item.name} {item.note && <small>({item.note})</small>}
                    </span>
                    <span className="font-semibold whitespace-nowrap">{item.price} kr</span>
                  </li>
                ))}
              </ul>
              <p className="-mt-1.5 mb-4.5 text-[13.5px] opacity-80">Priser enligt julmenyn 2025.</p>
              <Link to="/catering" hash="jul" className="btn btn-white self-start">
                Se hela julmenyn <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="cta-titel" className="section-y bg-mist text-center">
        <div className="wrap">
          <p className="kicker reveal">Nästa steg</p>
          <h2 id="cta-titel" className="statement reveal mx-auto max-w-[15em]">
            Planerar ni en fest, ett möte eller behöver ni hjälp med <span className="script">maten?</span>
          </h2>
          <p className="lead reveal mx-auto mt-6">
            Kontakta oss för pris, offert eller för att beställa catering. Berätta vad ni planerar så hjälper vi er att sätta ihop
            det som passar.
          </p>
          <div className="mx-auto mt-[clamp(40px,5vw,64px)] grid max-w-[960px] gap-3.5 text-left md:grid-cols-2">
            <Link to="/catering" className="reveal flex min-h-[260px] flex-col rounded-panel border border-line bg-white p-7.5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-32px_rgb(0_0_0/0.35)] max-md:min-h-[220px]">
              <span className="text-[11.5px] font-semibold tracking-[0.2em] text-muted uppercase">Utforska</span>
              <span className="mt-3.5 mb-2.5 font-display text-[clamp(34px,3vw,44px)] leading-[0.95] uppercase">Cateringmenyn</span>
              <span className="text-base text-muted">Bufféer, förrätter, varmrätter, grillrätter, husmanskost, sallader och desserter.</span>
              <span className="link-arrow mt-auto self-start pt-6">
                Bläddra i menyn <span aria-hidden>→</span>
              </span>
            </Link>
            <Link
              to="/kontakt"
              hash="offert"
              className="reveal flex min-h-[260px] flex-col rounded-panel bg-ink p-7.5 text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-32px_rgb(0_0_0/0.35)] max-md:min-h-[220px]"
            >
              <span className="text-[11.5px] font-semibold tracking-[0.2em] text-white/55 uppercase">Vi hjälper er gärna</span>
              <span className="mt-3.5 mb-2.5 font-display text-[clamp(34px,3vw,44px)] leading-[0.95] uppercase">Begär offert</span>
              <span className="text-base text-white/70">Fyll i datum, antal gäster och önskemål – så återkommer vi.</span>
              <span className="link-arrow mt-auto self-start pt-6">
                Till formuläret <span aria-hidden>→</span>
              </span>
            </Link>
          </div>
          <p className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-3 text-[15px] text-muted">
            <span>
              Ring{' '}
              {site.phones.map((p, i) => (
                <span key={p.href}>
                  {i > 0 && ' eller '}
                  <a href={p.href} className="font-semibold text-ink hover:text-red">
                    {p.label}
                  </a>
                </span>
              ))}
            </span>
            <span>
              Mejla{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-ink hover:text-red">
                {site.email}
              </a>
            </span>
          </p>
        </div>
      </section>
    </>
  )
}
