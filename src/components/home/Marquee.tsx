const occasions = ['Bröllop', 'Dop', 'Firmafester', 'Konferenser', 'Buffémat', 'Husmanskost', 'Dagens lunch']

export function Marquee() {
  return (
    <div aria-hidden className="overflow-hidden bg-ink pt-5.5 pb-4.5 text-white select-none">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-none items-center">
            {occasions.map((word) => (
              <span key={word} className="flex items-center">
                <span className="px-[0.42em] font-display text-[clamp(36px,4.4vw,64px)] leading-none tracking-[0.02em] whitespace-nowrap uppercase">
                  {word}
                </span>
                <span className="text-[clamp(22px,2.4vw,34px)] text-red">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
