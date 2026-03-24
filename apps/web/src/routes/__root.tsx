import { Link, HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { fetchSiteSettings } from '#/lib/settings'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '#/lib/seo'

import appCss from '../styles.css?url'

// ─── LocalBusiness + SportsActivityLocation JSON-LD ──────────────────────────
// Fill in every TODO before going to production. Structured data is one of the
// highest-value SEO changes for a local service business.

const localBusinessSchema = {
  '@context': 'https://schema.org',
  // SportsActivityLocation is the most precise type for a personal trainer.
  // LocalBusiness broadens discovery in Google Business panels.
  '@type': ['LocalBusiness', 'SportsActivityLocation'],

  name: SITE_NAME,
  // TODO: write a 150–200 word keyword-rich description of the business
  description:
    'NASM-certified personal trainer and nutrition coach offering 1-on-1 personal training, online coaching, and nutrition guidance for women.',

  url: SITE_URL,
  // TODO: replace with real phone number in E.164 format
  telephone: '+1-000-000-0000',
  // TODO: confirm contact email
  email: 'hello@katelynbellfitness.com',

  address: {
    '@type': 'PostalAddress',
    // TODO: replace with real street address, or remove if fully online-only
    streetAddress: '123 Fitness Lane',
    // TODO: confirm city
    addressLocality: 'Nashville',
    addressRegion: 'TN',
    // TODO: replace with real ZIP code
    postalCode: '37201',
    addressCountry: 'US',
  },

  geo: {
    '@type': 'GeoCoordinates',
    // TODO: replace with exact coordinates for the business location
    latitude: 36.1627,
    longitude: -86.7816,
  },

  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      // TODO: confirm actual days and hours
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '14:00',
    },
  ],

  // TODO: adjust price range symbol ($ budget · $$ mid · $$$ premium)
  priceRange: '$$',

  // TODO: update image once OG image is created (1200×630px recommended)
  image: DEFAULT_OG_IMAGE,

  // The trainer as a named Person — helps Knowledge Panel association
  founder: {
    '@type': 'Person',
    name: 'Katelyn Bell',
    jobTitle: 'NASM Certified Personal Trainer & Nutrition Coach',
    url: `${SITE_URL}/about`,
  },

  sameAs: [
    // TODO: add confirmed social profile URLs, e.g.:
    // 'https://www.instagram.com/katelynbellfitness',
    // 'https://www.facebook.com/katelynbellfitness',
    // 'https://www.tiktok.com/@katelynbellfitness',
  ],
}

// ─── 404 page ─────────────────────────────────────────────────────────────────

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
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn-secondary">
          Back to home
        </Link>
      </section>
    </main>
  )
}

// ─── Root route ───────────────────────────────────────────────────────────────

export const Route = createRootRoute({
  loader: () => fetchSiteSettings(),
  notFoundComponent: NotFoundPage,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // Fallback title — individual routes override this with their own
      { title: `Personal Trainer | ${SITE_NAME}` },
      // Default robots — individual routes set noindex when needed
      { name: 'robots', content: 'index, follow' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      // Favicon — also served automatically from /favicon.ico but explicit
      // <link> ensures it works in all browsers and on all paths
      { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
      // TODO: add apple-touch-icon once branding assets are ready
      // { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
    ],
  }),
  shellComponent: RootDocument,
})

// ─── Shell ────────────────────────────────────────────────────────────────────

function RootDocument({ children }: { children: React.ReactNode }) {
  const siteSettings = Route.useLoaderData()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* LocalBusiness + SportsActivityLocation structured data.
            Placed in <head> for crawler priority; Google accepts it anywhere. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[var(--color-primary-subtle)] selection:text-[var(--color-primary-dark)]">
        <Header settings={siteSettings} />
        {children}
        <Footer settings={siteSettings} />
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }]}
        />
        <Scripts />
      </body>
    </html>
  )
}
