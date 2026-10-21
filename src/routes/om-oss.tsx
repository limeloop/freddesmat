import { Link, createFileRoute } from '@tanstack/react-router'
import { PageHero } from '~/components/PageHero'
import { site } from '~/data/site'

const title = 'Om oss – Freddes Mat på Kusthöjden i Härnösand'
const description =
  'Freddes Mat lagar husmanskost och buffémat i köket på Kafé 9:an, Kusthöjden i Härnösand – till lunch, möten och stora tillfällen.'

export const Route = createFileRoute('/om-oss')({
  head: () => ({
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: `${site.url}/img/personalen.webp` },
    ],
    links: [{ rel: 'canonical', href: `${site.url}/om-oss` }],
  }),
  component: AboutPage,
})

const drivers = [
  { name: 'Sten-Inge Ek', text: 'Kör vår svarta bil i och runt Härnösand.' },
  { name: 'Stefan Fröberg', text: 'Kör vår nya vita kylbil.' },
]

const gallery = [
  { src: '/img/rostbiff-fat.webp', alt: 'Fat med rostbiff och garnityr' },
  { src: '/img/sallad.webp', alt: 'Sallad med morotsblomma' },
  { src: '/img/matlador-2.webp', alt: 'Lunchlådor på bricka' },
  { src: '/img/rakor.webp', alt: 'Snittar med räkor' },
]

function AboutPage() {
  return (
    <>
      <PageHero
        crumb="Om oss"
        kicker="Om oss"
        title="Välkommen till Freddes Mat"
        image={{
          src: '/img/personalen.webp',
          width: 1800,
          height: 1188,
          alt: 'Personalen på Freddes Mat i svarta tröjor med logotypen, i köket',
          className: 'aspect-[16/8]! object-[50%_40%]',
        }}
      >
        <p className="lead">
          Freddes Mat fixar det mesta inom restaurang och catering. I vårt kök på fina Kusthöjden i Härnösand lagar vi mat till
          allt från små möten till stora tillfällen.
        </p>
      </PageHero>

      <section aria-labelledby="kok-titel" className="pb-(--section)">
        <div className="wrap grid items-center gap-[clamp(32px,6vw,112px)] lg:grid-cols-2">
          <div className="reveal grid grid-cols-2 gap-3.5">
            <img src="/img/salladsbuffe.webp" width={1800} height={810} loading="lazy" alt="Salladsbuffén i Kafé 9:an" className="aspect-3/4 w-full rounded-panel object-cover object-[30%_50%]" />
            <img src="/img/kafe.webp" width={810} height={1800} loading="lazy" alt="Kaffestation i Kafé 9:an" className="mt-18 aspect-3/4 w-full rounded-panel object-cover max-md:mt-10" />
          </div>
          <div className="reveal text-body">
            <p className="kicker">Köket på Kusthöjden</p>
            <h2 id="kok-titel" className="statement mb-6.5 text-ink">
              Traditionell husmanskost – och buffémat som <span className="script">specialitet</span>
            </h2>
            <p className="max-w-[32em]">
              Till lunch utgår vi från traditionell husmanskost som vi tillagar i vårt kök på Kafé 9:an uppe på Kusthöjden. Här kan
              du alltid välja mellan två rätter samt en salladsbuffé – och kaffe och kaka ingår alltid efter maten.
            </p>
            <p className="mt-4 max-w-[32em]">
              Vår specialitet är buffémat, med ett stort, varierat och fräscht utbud. Allt är noga smaksatt och upplagt så att både
              ögon och mage blir nöjda.
            </p>
            <Link to="/" hash="lunch" className="link-arrow mt-4 text-ink">
              Veckans lunch <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="ute-titel" className="section-y bg-white">
        <div className="wrap grid items-center gap-[clamp(32px,6vw,112px)] lg:grid-cols-2">
          <div className="reveal text-body lg:order-1">
            <p className="kicker">Ute på stan</p>
            <h2 id="ute-titel" className="statement mb-6.5 text-ink">
              Vår mat finns även där du är
            </h2>
            <p className="max-w-[32em]">Våra chaufförer och säljare kör ut våra produkter i och runt Härnösand – och vidare till Sundsvall och Kramfors.</p>
            <ul className="my-7 grid gap-3.5 sm:grid-cols-2">
              {drivers.map((d) => (
                <li key={d.name} className="rounded-card border border-line bg-white px-5.5 py-5">
                  <strong className="mb-1.5 block font-display text-[28px] leading-none font-normal text-ink uppercase">{d.name}</strong>
                  <span className="text-[15px] text-muted">{d.text}</span>
                </li>
              ))}
            </ul>
            <p className="max-w-[32em]">
              Vill du ha våra produkter på just din arbetsplats? Kontakta oss! Och du vet väl att du även kan få maten hemkörd – ring
              oss så förklarar vi hur det funkar.
            </p>
            <Link to="/kontakt" className="link-arrow mt-4 text-ink">
              Kontakta oss <span aria-hidden>→</span>
            </Link>
          </div>
          <img
            src="/img/monter.webp"
            width={1800}
            height={810}
            loading="lazy"
            alt="Två från Freddes Mat bakom en monter med logotypen"
            className="reveal aspect-[4/4.4] w-full rounded-panel object-cover max-md:aspect-4/3"
          />
        </div>
      </section>

      <section aria-labelledby="galleri-titel" className="section-y">
        <div className="wrap">
          <header className="mb-[clamp(44px,5vw,72px)] grid items-end gap-x-[clamp(32px,6vw,96px)] gap-y-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="reveal">
              <p className="kicker">Från vårt kök</p>
              <h2 id="galleri-titel" className="display h-lg">
                Lagat med omsorg
              </h2>
            </div>
            <p className="lead reveal">
              Ett axplock från vardag och fest – följ oss gärna på{' '}
              <a href={site.facebook} target="_blank" rel="noopener" className="border-b-[1.5px] border-red">
                Facebook
              </a>{' '}
              för veckans meny och nyheter.
            </p>
          </header>
          <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
            {gallery.map((img, i) => (
              <img
                key={img.src}
                src={img.src}
                width={810}
                height={1800}
                loading="lazy"
                decoding="async"
                alt={img.alt}
                className={`reveal aspect-3/4 w-full rounded-card object-cover ${i % 2 === 1 ? 'mt-12' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-titel" className="section-y bg-mist text-center">
        <div className="wrap">
          <h2 id="cta-titel" className="statement reveal mx-auto max-w-[15em]">
            Låt oss sköta maten – så kan du koncentrera dig på <span className="script">allt annat</span>
          </h2>
          <div className="reveal mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/catering" className="btn btn-ink">
              Se vår catering <span aria-hidden>→</span>
            </Link>
            <Link to="/kontakt" hash="offert" className="btn btn-ghost">
              Begär offert
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
