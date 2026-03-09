import { createFileRoute, Link } from '@tanstack/react-router'
import { fetchHomePage } from '#/lib/home'
import { fetchSiteSettings } from '#/lib/settings'
// import { LocalBusinessJsonLd } from '#/components/LocalBusinessJsonLd'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [homePage, siteSettings] = await Promise.all([
      fetchHomePage(),
      fetchSiteSettings(),
    ])
    return { homePage, siteSettings }
  },
  head: () => ({}),
  component: App,
})

function App() {
  const { homePage, siteSettings } = Route.useLoaderData()

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        {homePage?.hero?.title && (
          <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
            {homePage?.hero?.title}
          </h1>
        )}

        {homePage?.hero?.description && (
          <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
            {homePage?.hero?.description}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {homePage?.hero?.cta?.link && (
            <Link
              to={homePage?.hero?.cta?.link}
              className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
            >
              {homePage?.hero?.cta?.label}
            </Link>
          )}
        </div>
      </section>

      <section className="mt-8">
        {homePage?.services?.title && (
          <h2 className="text-2xl font-bold text-[var(--sea-ink)]">
            {homePage?.services?.title}
          </h2>
        )}
        
        <div className="grid gap-4 lg:grid-cols-3">
          {homePage?.services?.services?.map((service, index) => (
            <article
              key={index}
              className="island-shell feature-card rise-in rounded-2xl p-5"
              style={{ animationDelay: `${index * 90 + 80}ms` }}
            >
              <h2 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
                {service.title}
              </h2>
              <p className="m-0 text-sm text-[var(--sea-ink-soft)]">{service.description}</p>
            </article>
          ))}
        </div>

        <div>
          {homePage?.services?.cta?.link && (
            <Link
              to={homePage?.services?.cta?.link}
              className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
            >
              {homePage?.services?.cta?.label}
            </Link>
          )}
        </div>
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6">
        <p className="island-kicker mb-2">Quick Start</p>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-[var(--sea-ink-soft)]">
          <li>
            Edit <code>src/routes/index.tsx</code> to customize the hero and
            product narrative.
          </li>
          <li>
            Update <code>src/components/Header.tsx</code> and{' '}
            <code>src/components/Footer.tsx</code> for brand links.
          </li>
          <li>
            Add routes in <code>src/routes</code> and tweak visual tokens in{' '}
            <code>src/styles.css</code>.
          </li>
        </ul>
      </section>
    </main>
  )
}
