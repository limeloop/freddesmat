import { useEffect, useState } from 'react'
import { Logo } from '../Logo'
import { lunchPrices, lunchWeek, formatShort } from '~/data/lunch'
import { useToday } from '~/lib/use-today'

const corner = 'absolute top-[calc(var(--header-h)+24px)] m-0 text-[11.5px] font-medium tracking-[0.32em] text-white/65 uppercase animate-rise [animation-delay:.6s]'

/** Helbildshero – mörk bild, centrerad logotyp och dagens lunch i ett kort. */
export function Stage() {
  return (
    <section
      aria-labelledby="hero-titel"
      className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-[#0d0d0d] px-(--gutter) pt-[calc(var(--header-h)+40px)] pb-24 text-white max-md:pb-[300px]"
    >
      <picture className="absolute inset-0 -z-20">
        <source media="(max-width: 720px)" srcSet="/img/hero-rostbiff-mobil.webp" width={1035} height={2048} />
        <img
          src="/img/hero-rostbiff.webp"
          width={2560}
          height={1152}
          fetchPriority="high"
          alt="Fat med rostbiff garnerade med apelsinblommor, jordgubbar och persilja"
          className="size-full animate-stage-zoom object-cover object-[50%_55%] blur-[1.2px] brightness-[0.48] contrast-[1.08] saturate-[0.72] max-md:object-[50%_40%]"
        />
      </picture>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_50%,rgb(0_0_0/0.12)_0%,rgb(0_0_0/0.5)_55%,rgb(0_0_0/0.82)_100%),linear-gradient(to_bottom,rgb(0_0_0/0.55)_0%,transparent_26%,transparent_70%,rgb(0_0_0/0.6)_100%)]"
      />

      <p className={`${corner} left-(--gutter)`}>
        <span className="mr-3 inline-block size-1.5 rounded-full bg-red align-[2px]" aria-hidden />
        Kusthöjden · Härnösand
      </p>
      <p className={`${corner} right-(--gutter) max-lg:hidden`}>Lunch · Catering</p>

      <div className="flex flex-col items-center text-center">
        <p className="mb-[clamp(18px,2.6vw,34px)] flex animate-rise items-center gap-4.5 text-[clamp(11px,0.95vw,13.5px)] font-medium tracking-[0.42em] text-white/80 uppercase before:h-px before:w-[clamp(28px,3.6vw,52px)] before:bg-white/50 after:h-px after:w-[clamp(28px,3.6vw,52px)] after:bg-white/50 max-md:tracking-[0.3em]">
          Mat för alla tillfällen
        </p>
        <h1 id="hero-titel" className="flex flex-col items-center">
          <Logo
            width={600}
            priority
            className="w-[clamp(260px,38vw,600px)] animate-rise drop-shadow-[0_12px_40px_rgb(0_0_0/0.45)] [animation-delay:.15s]"
          />
          <span className="mt-[clamp(16px,2vw,28px)] animate-rise font-display text-[clamp(20px,2.4vw,36px)] leading-none tracking-[0.14em] uppercase [animation-delay:.35s] before:mx-[0.6em] before:text-red before:content-['•'] after:mx-[0.6em] after:text-red after:content-['•'] max-md:tracking-[0.1em]">
            Lunch &amp; catering i Härnösand
          </span>
        </h1>
      </div>

      <a
        href="#lunch"
        className="absolute right-(--gutter) bottom-7 animate-rise text-[11.5px] font-medium tracking-[0.32em] text-white/60 uppercase transition-colors [animation-delay:.6s] hover:text-white max-md:hidden"
      >
        Scroll <span className="ml-1.5 inline-block animate-nudge" aria-hidden>↓</span>
      </a>

      <TodayCard />
    </section>
  )
}

const STORAGE_KEY = 'fm-card-closed'

function TodayCard() {
  const today = useToday()
  const [closed, setClosed] = useState(true)

  useEffect(() => {
    setClosed(sessionStorage.getItem(STORAGE_KEY) === '1')
  }, [])

  if (!today || closed) return null

  const day = lunchWeek.days.find((d) => d.date === today)
  const [lunch] = lunchPrices

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setClosed(true)
  }

  return (
    <aside
      aria-labelledby="dagens-titel"
      className="absolute right-[clamp(16px,2vw,32px)] bottom-[clamp(64px,7vw,88px)] w-80 animate-rise overflow-hidden rounded-card bg-paper text-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] [animation-delay:1.4s] max-md:inset-x-(--gutter) max-md:bottom-5 max-md:w-auto md:max-xl:hidden [@media(min-width:768px)_and_(max-height:759px)]:hidden"
    >
      <button
        type="button"
        onClick={close}
        aria-label="Stäng"
        className="absolute top-2.5 right-2.5 grid size-[30px] cursor-pointer place-items-center rounded-full bg-ink/75 text-base leading-none text-white hover:bg-red"
      >
        ×
      </button>
      <img src="/img/salladsbuffe.webp" width={1800} height={810} alt="" className="h-28 w-full object-cover max-md:hidden" />
      <div className="px-5 pt-4.5 pb-5">
        <p className="mb-2 flex items-center gap-2.5 text-[10.5px] font-semibold tracking-[0.24em] text-muted uppercase before:h-[1.5px] before:w-4.5 before:bg-red">
          {day ? `Idag · ${day.day} ${formatShort(day.date)}` : 'Veckans lunch'}
        </p>
        <h2 id="dagens-titel" className="font-display text-[26px] leading-none uppercase">
          {day ? 'Dagens lunchbuffé' : `Lunchmeny v.${lunchWeek.week}`}
        </h2>
        {day && (
          <ul className="mt-2.5 grid gap-1.5 text-[14.5px] leading-snug">
            {[...day.dishes, ...(day.extra ? [`${day.extra.label}: ${day.extra.text}`] : [])].map((dish) => (
              <li key={dish} className="relative pl-3.5 before:absolute before:top-[0.55em] before:left-0 before:size-1.5 before:rounded-full before:bg-red">
                {dish}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 mb-3.5 text-[12.5px] text-muted">
          {lunch.price} kr · Mån–fre 10.30–13.00 · Salladsbuffé ingår
        </p>
        <a href="#lunch" className="link-arrow text-[11.5px]">
          Se veckans meny <span aria-hidden>→</span>
        </a>
      </div>
    </aside>
  )
}
