import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute, useRouterState } from '@tanstack/react-router'
import { SiteHeader } from '~/components/SiteHeader'
import { SiteFooter } from '~/components/SiteFooter'
import { site } from '~/data/site'
import appCss from '~/styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#171717' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'sv_SE' },
      { property: 'og:site_name', content: site.name },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon-32.png', sizes: '32x32' },
      { rel: 'apple-touch-icon', href: '/icon-192.png' },
      { rel: 'preload', href: '/fonts/bebas-neue-latin.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      {
        rel: 'preload',
        href: '/fonts/instrument-sans-var-latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  const isHome = useRouterState({ select: (s) => s.location.pathname === '/' })

  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body data-home={isHome || undefined}>
        <a
          href="#innehall"
          className="fixed top-[-60px] left-3 z-[100] rounded-full bg-white px-4 py-2.5 font-semibold text-ink focus:top-3"
        >
          Hoppa till innehållet
        </a>
        <SiteHeader isHome={isHome} />
        <main id="innehall">{children}</main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <section className="wrap section-y text-center">
      <p className="kicker">404</p>
      <h1 className="display h-lg">Sidan finns inte</h1>
      <p className="lead mx-auto mt-6">Men maten finns kvar. Gå till startsidan eller se veckans lunch.</p>
      <a className="btn btn-ink mt-8" href="/">
        Till startsidan
      </a>
    </section>
  )
}
