import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { Logo } from './Logo'
import { nav, site } from '~/data/site'

const [mainPhone] = site.phones

export function SiteHeader({ isHome }: { isHome: boolean }) {
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  // Mobilmenyn är en native popover. Vi placerar den under headern och håller knappens text i synk.
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const onToggle = (event: Event) => {
      const isOpen = (event as ToggleEvent).newState === 'open'
      if (isOpen && headerRef.current) {
        menu.style.top = `${Math.max(0, headerRef.current.getBoundingClientRect().bottom)}px`
      }
      setOpen(isOpen)
    }
    menu.addEventListener('beforetoggle', onToggle)
    return () => menu.removeEventListener('beforetoggle', onToggle)
  }, [])

  const close = () => menuRef.current?.hidePopover()

  return (
    <>
      {!isHome && (
        <div className="bg-red text-[12.5px] font-medium tracking-[0.04em] text-white">
          <div className="wrap flex min-h-[38px] items-center justify-between gap-6 max-md:justify-center">
            <div className="flex gap-7">
              <span>
                <span className="mr-2 inline-block size-1.5 rounded-full bg-white align-[1px]" aria-hidden />
                Lunch {site.hours.lunch.toLowerCase()}
              </span>
              <span className="max-lg:hidden">Salladsbuffé varje dag</span>
            </div>
            <div className="flex gap-7 max-md:hidden">
              <span>
                {site.place}, {site.city}
              </span>
              <a href={mainPhone.href} className="hover:underline">
                {mainPhone.label}
              </a>
            </div>
          </div>
        </div>
      )}

      <header ref={headerRef} className="site-header">
        <div className="wrap flex h-(--header-h) items-center justify-between gap-8">
          <Link to="/" className="brand block flex-none py-1.5" aria-label="Freddes Mat – till startsidan">
            <Logo width={86} priority className="h-[62px] w-auto max-lg:h-[46px]" />
          </Link>

          <nav aria-label="Huvudmeny" className="flex items-center gap-[clamp(20px,2.6vw,40px)] max-lg:hidden">
            <ul className="flex gap-[clamp(20px,2.4vw,38px)]">
              {nav.map((item) => (
                <li key={item.label}>
                  <NavLink
                    item={item}
                    className="group relative inline-block py-2 text-[12.5px] font-medium tracking-[0.18em] text-white/80 uppercase transition-colors hover:text-white aria-[current=page]:text-white"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0.5 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-300 ease-brand group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
            <a
              href={mainPhone.href}
              className="text-[13px] font-medium tracking-[0.04em] whitespace-nowrap text-white/80 hover:text-white max-xl:hidden"
            >
              {mainPhone.label}
            </a>
            <Link to="/kontakt" hash="offert" className="btn btn-sm btn-red">
              Begär offert
            </Link>
          </nav>

          <button
            type="button"
            popoverTarget="mobilmeny"
            aria-expanded={open}
            className="flex h-11 cursor-pointer items-center gap-2.5 pl-3.5 text-xs font-semibold tracking-[0.18em] uppercase lg:hidden"
          >
            {open ? 'Stäng' : 'Meny'}
            <span aria-hidden className="relative h-3 w-[22px]">
              <span
                className={`absolute inset-x-0 h-0.5 bg-current transition-all duration-300 ${open ? 'top-[5px] rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute inset-x-0 h-0.5 bg-current transition-all duration-300 ${open ? 'top-[5px] -rotate-45' : 'top-2.5'}`}
              />
            </span>
          </button>
        </div>
      </header>

      <div id="mobilmeny" ref={menuRef} popover="auto" className="lg:hidden">
        <div className="flex min-h-full flex-col justify-between gap-8 px-(--gutter) pt-7 pb-10">
          <ul>
            {[{ to: '/', label: 'Start' } as const, ...nav].map((item, i) => (
              <li key={item.label}>
                <NavLink
                  item={item}
                  onClick={close}
                  className="flex items-baseline justify-between border-b border-line-light py-3.5 font-display text-[clamp(44px,13vw,52px)] leading-none uppercase aria-[current=page]:text-red"
                >
                  {'hash' in item ? 'Veckans lunch' : item.label}
                  <span className="font-sans text-xs tracking-[0.2em] text-white/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="grid gap-5">
            <Link to="/kontakt" hash="offert" onClick={close} className="btn btn-red w-full">
              Begär offert <span aria-hidden>→</span>
            </Link>
            <p className="text-[15px] leading-relaxed text-white/70">
              {site.phones.map((p, i) => (
                <span key={p.href}>
                  {i > 0 && ' · '}
                  <a href={p.href} className="text-white">
                    {p.label}
                  </a>
                </span>
              ))}
              <br />
              Lunch {site.hours.lunch.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

type NavItem = { to: string; label: string; hash?: string }

/**
 * Sidlänkar markeras som aktiva av routern. Ankarlänken till veckans lunch är en vanlig länk –
 * den pekar in på startsidan och ska inte se aktiv ut där.
 */
function NavLink({ item, className, onClick, children }: { item: NavItem; className: string; onClick?: () => void; children: ReactNode }) {
  if (item.hash) {
    return (
      <a href={`${item.to}#${item.hash}`} onClick={onClick} className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link to={item.to} onClick={onClick} activeOptions={{ exact: true }} className={className}>
      {children}
    </Link>
  )
}
