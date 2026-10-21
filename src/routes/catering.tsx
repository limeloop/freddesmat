import { Fragment } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { PageHero } from '~/components/PageHero'
import { MenuNav } from '~/components/catering/MenuNav'
import { MenuSectionView } from '~/components/catering/MenuSectionView'
import { cateringMenu } from '~/data/catering'
import { site } from '~/data/site'

const title = 'Catering i Härnösand – bufféer, festmat och husmanskost | Freddes Mat'
const description =
  'Catering i Härnösand från Freddes Mat: bufféer, förrätter, varmrätter, grillrätter, husmanskost, sallader och julmat. Till bröllop, dop, firmafester och konferenser.'

export const Route = createFileRoute('/catering')({
  head: () => ({
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: `${site.url}/img/rostbiff-portioner.webp` },
    ],
    links: [{ rel: 'canonical', href: `${site.url}/catering` }],
  }),
  component: CateringPage,
})

const facts = [
  { title: 'Fest & vardag', text: 'Bröllop, dop, firmafester, konferenser och små möten. Vår specialitet är buffémat.' },
  { title: 'Porslin? Det fixar vi', text: 'Maten kommer färdig. Det är bara att ställa fram och njuta.' },
  { title: 'Speciella önskemål', text: 'Tveka inte att höra av dig, så hjälper vi dig att samla ihop det som passar just dig.' },
]

/** Bildrader som läggs in efter vissa kategorier. */
const photoBreaks: Record<string, { src: string; w: number; h: number; alt: string }[]> = {
  buffeer: [
    { src: '/img/canapeer.webp', w: 810, h: 1800, alt: 'Snittar med dill på plåtar' },
    { src: '/img/laxsnittar.webp', w: 810, h: 1800, alt: 'Snittar med lax och citron' },
    { src: '/img/snittar.webp', w: 810, h: 1800, alt: 'Snittar toppade med persilja och morot' },
  ],
  varmratter: [
    { src: '/img/ostbricka.webp', w: 1800, h: 874, alt: 'Ostbrickor med druvor, tomater och paprika' },
    { src: '/img/wrap.webp', w: 1350, h: 1800, alt: 'Tortilla med fyllning, picklad rödlök och sås' },
  ],
}

function CateringPage() {
  return (
    <>
      <PageHero
        crumb="Catering"
        kicker="Beställ catering"
        title="Catering i Härnösand"
        image={{
          src: '/img/rostbiff-portioner.webp',
          width: 1800,
          height: 810,
          alt: 'Fat med rostbiff garnerade med apelsinblommor, jordgubbar och persilja',
        }}
      >
        <p className="lead mb-7">
          Mat för alla tillfällen – från bröllop och dop till firmafester och konferenser. Låt oss sköta maten, så att du kan
          koncentrera dig på allt annat som behövs för en lyckad sammankomst.
        </p>
        <div className="flex flex-wrap gap-3 max-md:*:flex-auto">
          <Link to="/kontakt" hash="offert" className="btn btn-red">
            Begär offert <span aria-hidden>→</span>
          </Link>
          <a href={site.phones[0].href} className="btn btn-ghost">
            Ring {site.phones[0].label}
          </a>
        </div>
      </PageHero>

      <div className="wrap pb-[clamp(56px,7vw,96px)]">
        <ul className="grid gap-3.5 md:grid-cols-3">
          {facts.map((fact) => (
            <li key={fact.title} className="reveal rounded-card border border-line bg-white px-6.5 pt-7 pb-6.5">
              <p className="mb-2.5 font-display text-3xl leading-none uppercase">{fact.title}</p>
              <p className="text-base text-muted">{fact.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <MenuNav sections={cateringMenu} />

      <div className="wrap pb-(--section)">
        <p className="mt-10 flex items-start gap-3.5 rounded-card border border-line bg-white px-5.5 py-4.5 text-[15px] text-muted before:grid before:size-6 before:flex-none before:place-items-center before:rounded-full before:bg-red before:font-serif before:text-[13px] before:text-white before:italic before:content-['i']">
          <span>
            <strong className="text-ink">Om priserna:</strong> Rätter och priser är hämtade ur vår cateringmeny 2021 och julmeny
            2025. Kontakta oss för aktuella priser, tillgänglighet och offert.
          </span>
        </p>

        {cateringMenu.map((section, i) => (
          <Fragment key={section.id}>
            <MenuSectionView section={section} index={i} tone={section.id === 'jul' ? 'red' : 'light'} />
            {photoBreaks[section.id] && (
              <div
                className={`reveal mt-[clamp(56px,7vw,96px)] grid gap-3.5 ${photoBreaks[section.id]!.length === 3 ? 'grid-cols-2 md:grid-cols-3' : 'md:grid-cols-[2fr_1fr]'}`}
              >
                {photoBreaks[section.id]!.map((img, n) => (
                  <img
                    key={img.src}
                    src={img.src}
                    width={img.w}
                    height={img.h}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className={`w-full rounded-card object-cover ${photoBreaks[section.id]!.length === 3 ? 'aspect-4/5' : 'h-full max-h-[520px]'} ${n === 2 || (photoBreaks[section.id]!.length === 2 && n === 1) ? 'max-md:hidden' : ''}`}
                  />
                ))}
              </div>
            )}
          </Fragment>
        ))}

        <section aria-labelledby="cta-titel" className="pt-(--section) text-center">
          <p className="kicker reveal">Begär offert</p>
          <h2 id="cta-titel" className="statement reveal mx-auto max-w-[15em]">
            Berätta vad ni planerar – så hjälper vi er att sätta ihop <span className="script">menyn</span>
          </h2>
          <p className="lead reveal mx-auto mt-6">
            Kontakta oss för pris och offert, eller för att beställa catering. Har du speciella önskemål och behov? Tveka inte att
            höra av dig.
          </p>
          <div className="reveal mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/kontakt" hash="offert" className="btn btn-red">
              Begär offert <span aria-hidden>→</span>
            </Link>
            <a href={site.phones[0].href} className="btn btn-ghost">
              Ring {site.phones[0].label}
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
