import { Link } from '@tanstack/react-router'
import { Logo } from './Logo'
import { site } from '~/data/site'

const title = 'mb-4 text-[11.5px] font-semibold tracking-[0.22em] text-white/45 uppercase'
const link = 'text-white transition-colors hover:text-red'

export function SiteFooter() {
  return (
    <footer className="bg-ink pt-[clamp(64px,8vw,112px)] pb-8 text-[15.5px] text-white/70">
      <div className="wrap">
        <div className="grid grid-cols-[1.4fr_repeat(3,1fr)] gap-x-[clamp(24px,4vw,64px)] gap-y-10 max-xl:grid-cols-3 max-md:grid-cols-2 max-[420px]:grid-cols-1">
          <div className="max-xl:col-span-full">
            <Logo width={190} className="mb-5.5 w-[190px]" />
            <p className="max-w-[22em]">
              Restaurang och catering på Kusthöjden i Härnösand. Dagens lunch, buffémat och mat till alla tillfällen.
            </p>
          </div>

          <div>
            <p className={title}>Besök oss</p>
            <address className="not-italic">
              {site.place}
              <br />
              {site.street}
              <br />
              {site.postalCode} {site.city}
            </address>
            <p className={`${title} mt-7`}>Öppettider</p>
            <p>
              Lunch {site.hours.lunch.toLowerCase()}
              <br />
              Övrig tid öppet för beställning
            </p>
          </div>

          <div>
            <p className={title}>Kontakt</p>
            {site.phones.map((p) => (
              <a key={p.href} href={p.href} className={`${link} block font-display text-3xl leading-[1.1] tracking-[0.01em]`}>
                {p.label}
              </a>
            ))}
            <a href={`mailto:${site.email}`} className={`${link} mt-3 inline-block`}>
              {site.email}
            </a>
          </div>

          <div>
            <p className={title}>Sidor</p>
            <ul className="grid gap-2">
              <li>
                <a href="/#lunch" className={link}>
                  Veckans lunch
                </a>
              </li>
              <li>
                <Link to="/catering" className={link}>
                  Catering
                </Link>
              </li>
              <li>
                <Link to="/om-oss" className={link}>
                  Om oss
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className={link}>
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to="/kontakt" hash="offert" className={link}>
                  Begär offert
                </Link>
              </li>
              <li>
                <a href={site.facebook} target="_blank" rel="noopener" className={link}>
                  Facebook ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[clamp(56px,7vw,96px)] flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-line-light pt-6 text-[13px] text-white/45">
          <span>© {new Date().getFullYear()} Freddes Mat</span>
          <span>
            Utvecklad av{' '}
            <a href="https://limeloop.se" target="_blank" rel="noopener" className="text-white/70 hover:text-red">
              Limeloop AB
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
