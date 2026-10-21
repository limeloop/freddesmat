import type { Buffet, MenuItem, MenuSection } from '~/data/catering'

type Tone = 'light' | 'red'

/** En kategori i cateringmenyn – rubrik, ingress och rätter eller bufféer. */
export function MenuSectionView({ section, index, tone = 'light' }: { section: MenuSection; index: number; tone?: Tone }) {
  const onRed = tone === 'red'

  return (
    <section
      id={section.id}
      aria-labelledby={`t-${section.id}`}
      className={
        onRed
          ? 'mt-[clamp(64px,8vw,120px)] scroll-mt-[calc(var(--header-h)+88px)] rounded-panel bg-red px-[clamp(24px,4vw,64px)] py-[clamp(40px,5vw,72px)] text-white'
          : 'scroll-mt-[calc(var(--header-h)+40px)] pt-[clamp(64px,8vw,120px)]'
      }
    >
      <header
        className={`reveal grid items-end gap-x-[clamp(32px,6vw,96px)] gap-y-4 border-b-2 pb-7 lg:grid-cols-2 ${onRed ? 'border-white' : 'border-ink'}`}
      >
        <div>
          <span className={`mb-2.5 block text-xs font-semibold tracking-[0.22em] ${onRed ? 'text-white/85' : 'text-red'}`}>
            {section.label ?? String(index + 1).padStart(2, '0')}
          </span>
          <h2 id={`t-${section.id}`} className="display h-lg">
            {section.title}
          </h2>
        </div>
        <p className={`max-w-[34em] ${onRed ? 'text-white/85' : 'text-muted'}`}>{section.intro}</p>
      </header>

      {section.buffets && (
        <div className="mt-8 grid gap-3.5 md:grid-cols-2 xl:grid-cols-3">
          {section.buffets.map((buffet) => (
            <BuffetCard key={buffet.name} buffet={buffet} />
          ))}
        </div>
      )}

      {section.groups && (
        <div className="grid gap-x-[clamp(32px,5vw,80px)] md:grid-cols-2">
          {section.groups.map((group, gi) => (
            <div key={group.title ?? gi} className="contents">
              {group.title && (
                <h3 className={`col-span-full pt-9 pb-1 font-display text-3xl leading-none uppercase ${onRed ? 'text-white' : 'text-red'}`}>
                  {group.title}
                  {group.note && (
                    <span className="ml-2 font-sans text-[15px] tracking-normal text-muted normal-case">– {group.note}</span>
                  )}
                </h3>
              )}
              {group.items.map((item) => (
                <Item key={item.name + (item.desc ?? '')} item={item} onRed={onRed} />
              ))}
            </div>
          ))}
          {section.dressings && (
            <div className="py-5">
              <h3 className="text-[15px] font-semibold tracking-[0.06em] uppercase">Dressingar</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {section.dressings.map((d) => (
                  <li key={d} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {section.footnote && <p className="mt-6.5 text-[15px] text-white/85">{section.footnote}</p>}
    </section>
  )
}

function Item({ item, onRed }: { item: MenuItem; onRed: boolean }) {
  return (
    <div className={`grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b py-5 ${onRed ? 'border-white/25' : 'border-line'}`}>
      <h4 className="text-[15px] font-semibold tracking-[0.06em] uppercase">
        {item.name}
        {item.veg && (
          <span className="ml-1.5 inline-block rounded-full bg-[#e8f0e2] px-2 pt-0.5 pb-px align-[2px] text-[10.5px] tracking-[0.12em] text-[#3c5a2a]">
            Veg
          </span>
        )}
      </h4>
      {item.desc && <p className={`col-start-1 m-0 text-[15.5px] leading-normal ${onRed ? 'text-white/80' : 'text-muted'}`}>{item.desc}</p>}
      {item.price !== undefined && (
        <span className="col-start-2 row-span-2 row-start-1 self-center text-right whitespace-nowrap">
          {typeof item.price === 'number' ? (
            <span className="font-display text-[28px] leading-none">
              {item.total && <small className="mr-1 font-sans text-xs opacity-70">Totalt</small>}
              {item.price}
              <small className="ml-0.5 font-sans text-xs opacity-70">:-</small>
            </span>
          ) : (
            <span className="block max-w-[7em] text-[13px] font-semibold tracking-[0.08em] whitespace-normal uppercase">{item.price}</span>
          )}
        </span>
      )}
    </div>
  )
}

function BuffetCard({ buffet }: { buffet: Buffet }) {
  const dark = buffet.featured
  return (
    <article className={`reveal flex flex-col rounded-card border p-6.5 pt-7 ${dark ? 'border-ink bg-ink text-white' : 'border-line bg-white'}`}>
      <div className={`mb-3.5 flex items-baseline justify-between gap-4 border-b pb-4 ${dark ? 'border-line-light' : 'border-line'}`}>
        <h3 className="font-display text-[32px] leading-[0.95] uppercase">{buffet.name}</h3>
        <span className="font-display text-[34px] leading-none whitespace-nowrap text-red">
          {buffet.price}
          <small className="font-sans text-xs text-muted">:-</small>
        </span>
      </div>
      <ul className={`grid gap-1.5 text-[15.5px] ${dark ? 'text-white/80' : 'text-body'}`}>
        {buffet.items.map((item) => (
          <li key={item} className="relative pl-4 before:absolute before:top-[0.68em] before:left-0 before:h-[1.5px] before:w-1.5 before:bg-red">
            {item}
          </li>
        ))}
      </ul>
      {buffet.addon && (
        <p className={`mt-auto pt-4.5 text-[14.5px] ${dark ? 'text-white/65' : 'text-muted'}`}>
          + {buffet.addon.text} <strong className={`whitespace-nowrap ${dark ? 'text-white' : 'text-ink'}`}>{buffet.addon.price}:-</strong>
        </p>
      )}
    </article>
  )
}
