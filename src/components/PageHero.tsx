import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

type PageHeroProps = {
  kicker: string
  title: string
  crumb: string
  children: ReactNode
  image?: { src: string; width: number; height: number; alt: string; className?: string }
}

/** Rubrikblock för undersidorna: brödsmulor, stor rubrik, ingress och en bred bild. */
export function PageHero({ kicker, title, crumb, children, image }: PageHeroProps) {
  return (
    <>
      <section aria-labelledby="sidtitel" className="pt-[clamp(48px,6vw,96px)] pb-[clamp(40px,5vw,72px)]">
        <div className="wrap grid items-end gap-[clamp(32px,5vw,88px)] lg:grid-cols-[1fr_0.9fr]">
          <div>
            <nav aria-label="Brödsmulor" className="mb-6.5 flex gap-2.5 text-[13px] text-muted">
              <Link to="/" className="hover:text-red">
                Start
              </Link>
              <span aria-hidden>/</span>
              <span>{crumb}</span>
            </nav>
            <p className="kicker animate-rise">{kicker}</p>
            <h1 id="sidtitel" className="display h-xl animate-rise [animation-delay:.06s]">
              {title}
            </h1>
          </div>
          <div className="animate-rise [animation-delay:.12s]">{children}</div>
        </div>
      </section>
      {image && (
        <div className="wrap pb-[clamp(48px,6vw,96px)]">
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            fetchPriority="high"
            className={`aspect-21/9 w-full rounded-panel object-cover max-md:aspect-4/3 ${image.className ?? ''}`}
          />
        </div>
      )}
    </>
  )
}
