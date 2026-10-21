import { useEffect, useRef, useState } from 'react'
import type { MenuSection } from '~/data/catering'

/** Klistrad kategorirad som följer med när man scrollar och markerar den kategori man läser. */
export function MenuNav({ sections }: { sections: Pick<MenuSection, 'id' | 'title'>[] }) {
  const [active, setActive] = useState<string | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    for (const { id } of sections) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [sections])

  useEffect(() => {
    if (!active) return
    const link = listRef.current?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`)
    if (link) listRef.current?.scrollTo({ left: link.offsetLeft - 24, behavior: 'smooth' })
  }, [active])

  return (
    <nav aria-label="Cateringmenyns kategorier" className="sticky top-(--header-h) z-40 border-b border-line bg-paper/95 backdrop-blur-md">
      <ul ref={listRef} className="wrap flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              className="inline-flex min-h-10 items-center rounded-full border border-line bg-white px-4 text-xs font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-colors hover:border-ink aria-[current]:border-ink aria-[current]:bg-ink aria-[current]:text-white"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
