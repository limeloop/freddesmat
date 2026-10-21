type LogoProps = {
  className?: string
  /** Visad bredd i px – styr srcset. */
  width: number
  priority?: boolean
}

/** Freddes Mats befintliga logotyp (vit text, röd stekpanna) – kräver mörk bakgrund. */
export function Logo({ className, width, priority = false }: LogoProps) {
  return (
    <img
      src="/img/freddes-mat-logo.png"
      srcSet="/img/freddes-mat-logo.png 640w, /img/freddes-mat-logo@2x.png 1280w"
      sizes={`${width}px`}
      width={640}
      height={463}
      alt="Freddes Mat"
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
