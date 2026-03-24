import { Link, HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { fetchSiteSettings } from '#/lib/settings'

import appCss from '../styles.css?url'

function NotFoundPage() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell p-8 text-center">
        <h1
          className="section-heading mb-3 text-3xl"
          style={{ color: 'var(--color-text)' }}
        >
          Page not found
        </h1>
        <p className="mb-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="btn-secondary">
          Back to home
        </Link>
      </section>
    </main>
  )
}

export const Route = createRootRoute({
  loader: () => fetchSiteSettings(),
  notFoundComponent: NotFoundPage,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Katelyn Bell Fitness',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const siteSettings = Route.useLoaderData()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[var(--color-primary-subtle)] selection:text-[var(--color-primary-dark)]">
        <Header settings={siteSettings} />
        {children}
        <Footer settings={siteSettings} />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
