import { formatShort, lunchPrices, lunchWeek, weekRange } from '~/data/lunch'
import { site } from '~/data/site'
import { useToday } from '~/lib/use-today'

const [mainPhone] = site.phones

export function WeeklyLunch() {
  const today = useToday()

  return (
    <section id="lunch" aria-labelledby="lunch-titel" className="section-y bg-white">
      <div className="wrap">
        <header className="mb-[clamp(44px,5vw,72px)] grid items-end gap-x-[clamp(32px,6vw,96px)] gap-y-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="reveal">
            <p className="kicker">Veckans lunch</p>
            <h2 id="lunch-titel" className="flex flex-wrap items-baseline gap-x-4.5">
              <span className="display h-lg">Lunchmeny v.{lunchWeek.week}</span>
              <span className="script inline-block -rotate-4 text-[clamp(30px,3vw,44px)]">Varmt välkommen!</span>
            </h2>
            <p className="mt-3.5 text-[15px] text-muted">
              {weekRange(lunchWeek)} · Servering 10.30–13.00
            </p>
          </div>
          <p className="lead reveal">
            Traditionell husmanskost från vårt kök på Kafé 9:an. Välj mellan två rätter varje dag – salladsbuffé, kaffe
            och kaka ingår.
          </p>
        </header>

        <div className="grid items-start gap-[clamp(32px,5vw,80px)] lg:grid-cols-[1fr_minmax(300px,380px)]">
          <div className="reveal border-t-2 border-ink">
            {lunchWeek.days.map((d) => {
              const isToday = d.date === today
              return (
                <article
                  key={d.date}
                  data-today={isToday || undefined}
                  className="group relative grid gap-x-8 gap-y-3.5 border-b border-line py-6 md:grid-cols-[200px_1fr] data-today:before:absolute data-today:before:inset-y-[-1px] data-today:before:-left-3.5 data-today:before:w-1 data-today:before:bg-red md:data-today:before:-left-(--gutter)"
                >
                  <div className="flex items-baseline gap-3 md:flex-col md:gap-1.5">
                    <h3 className="font-display text-[clamp(38px,3.4vw,50px)] leading-[0.9] uppercase group-data-today:text-red">
                      {d.day}
                    </h3>
                    <time dateTime={d.date} className="text-[13px] font-medium tracking-[0.12em] text-muted uppercase">
                      {formatShort(d.date)}
                    </time>
                    {isToday && (
                      <span className="ml-auto self-center rounded-full bg-red px-2.5 pt-1 pb-[3px] text-[11px] font-semibold tracking-[0.16em] text-white uppercase md:ml-0 md:self-start">
                        Idag
                      </span>
                    )}
                  </div>
                  <ul className="grid content-center gap-3">
                    {d.dishes.map((dish, i) => (
                      <li key={dish} className="grid grid-cols-[28px_1fr] items-baseline text-[clamp(18px,1.5vw,21px)] leading-[1.35] tracking-[-0.01em]">
                        <span className="font-display text-lg text-red">{i + 1}</span>
                        {dish}
                      </li>
                    ))}
                    {d.extra && (
                      <li className="grid grid-cols-[28px_1fr] items-baseline text-base text-muted">
                        <span className="font-display text-lg text-red">+</span>
                        <span>
                          <strong className="font-semibold text-ink">{d.extra.label}:</strong> {d.extra.text}
                        </span>
                      </li>
                    )}
                  </ul>
                </article>
              )
            })}
          </div>

          <aside
            aria-labelledby="pris-titel"
            className="reveal overflow-hidden rounded-panel bg-ink px-7.5 pt-8 pb-7.5 text-white lg:sticky lg:top-[calc(var(--header-h)+24px)]"
          >
            <div className="mb-4.5 flex items-baseline justify-between">
              <h3 id="pris-titel" className="font-display text-[34px] leading-none uppercase">
                Pris
              </h3>
              <span className="script text-2xl">Dagens lunchbuffé</span>
            </div>
            <ul>
              {lunchPrices.map((p, i) => (
                <li key={p.label} className="flex items-baseline gap-3 border-t border-line-light py-3.5">
                  {p.label}
                  <span className={`ml-auto font-display leading-[0.9] tracking-[0.01em] ${i === 0 ? 'text-[44px]' : 'text-[34px]'}`}>
                    {p.price}
                    <small className="ml-0.5 font-sans text-[13px] text-white/60">kr</small>
                  </span>
                </li>
              ))}
            </ul>
            <p className="my-5 rounded-[10px] bg-white/6 px-4.5 py-4 text-[14.5px] leading-[1.55] text-white/80">
              <strong className="block text-base font-semibold text-white">{site.hours.lunchLong}</strong>
              {site.hours.other}
            </p>
            <ul className="mb-6.5 grid gap-2.5 text-[15px] text-white/80">
              {['Salladsbuffé varje dag', 'Kaffe och kaka ingår alltid efter maten', `${site.place.split(',')[0]}, ${site.street}, Kusthöjden`].map(
                (text) => (
                  <li key={text} className="flex items-baseline gap-3 before:size-[7px] before:flex-none before:-translate-y-px before:rounded-full before:bg-red">
                    {text}
                  </li>
                ),
              )}
            </ul>
            <a href={mainPhone.href} className="btn btn-white w-full">
              Ring {mainPhone.label}
            </a>
          </aside>
        </div>

        <div className="reveal mt-[clamp(48px,6vw,80px)] grid gap-3.5 md:grid-cols-[1.5fr_1fr]">
          <PhotoCaption src="/img/salladsbuffe.webp" w={1800} h={810} alt="Salladsbuffén med skålar av färska grönsaker och tillbehör" title="Salladsbuffé varje dag" sub="Ingår i lunchen – liksom kaffe och kaka efter maten." />
          <PhotoCaption src="/img/matlador.webp" w={810} h={1800} alt="Lunchlådor med husmanskost uppställda på bricka" title="Avhämtning 95 kr" className="max-md:hidden" position="50% 62%" />
        </div>
        <p className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-muted">
          <span>
            <strong className="text-ink">Och du –</strong> du vet väl att du kan få maten hemkörd?
          </span>
          <a href={mainPhone.href} className="border-b-[1.5px] border-red font-semibold text-ink">
            Ring oss så förklarar vi hur det funkar
          </a>
        </p>
      </div>
    </section>
  )
}

type PhotoCaptionProps = {
  src: string
  w: number
  h: number
  alt: string
  title: string
  sub?: string
  className?: string
  position?: string
}

function PhotoCaption({ src, w, h, alt, title, sub, className = '', position }: PhotoCaptionProps) {
  return (
    <figure className={`relative m-0 h-[clamp(300px,32vw,460px)] overflow-hidden rounded-panel max-md:h-auto max-md:aspect-4/3 ${className}`}>
      <img src={src} width={w} height={h} alt={alt} loading="lazy" decoding="async" className="size-full object-cover" style={position ? { objectPosition: position } : undefined} />
      <div aria-hidden className="absolute inset-x-0 top-[45%] bottom-0 bg-linear-to-t from-black/55 to-transparent" />
      <figcaption className="absolute inset-x-6 bottom-5.5 font-display text-[clamp(30px,3vw,46px)] leading-[0.95] text-white uppercase [text-shadow:0_2px_24px_rgb(0_0_0/0.35)]">
        {title}
        {sub && <small className="mt-1.5 block font-sans text-sm leading-snug tracking-normal normal-case opacity-90">{sub}</small>}
      </figcaption>
    </figure>
  )
}
