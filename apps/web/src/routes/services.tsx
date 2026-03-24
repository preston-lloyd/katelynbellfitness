import { createFileRoute } from '@tanstack/react-router'
import { buildMeta, buildBreadcrumb, SITE_URL, CITY } from '#/lib/seo'
import ServicesSection from '#/components/ServicesSection'
import ContactSection from '#/components/ContactSection'

export const Route = createFileRoute('/services')({
  head: () =>
    buildMeta({
      title:       `Personal Training & Online Coaching Services | Katelyn Bell Fitness`,
      description: `Explore 1-on-1 personal training, online coaching, and nutrition guidance from Katelyn Bell Fitness in ${CITY}, TN. Tailored programmes for every fitness level — book a free consultation today.`,
      canonical:   `${SITE_URL}/services`,
    }),
  component: Services,
})

const breadcrumb = buildBreadcrumb([
  { name: 'Home',     item: SITE_URL },
  { name: 'Services', item: `${SITE_URL}/services` },
])

function Services() {
  return (
    <main>
      {/* BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Page-level h1 */}
      <div
        className="page-wrap text-center"
        style={{ paddingBlock: 'calc(var(--space-section-y) * 0.55)' }}
      >
        <p className="label-kicker mb-4">What I Offer</p>
        <h1
          className="section-heading mx-auto"
          style={{ fontSize: 'var(--text-h1)', color: 'var(--color-text)', maxWidth: '34rem' }}
        >
          {/* TODO: confirm city name */}
          Personal Training &amp; Coaching{' '}
          <span style={{ color: 'var(--color-primary)' }}>in {CITY}</span>
        </h1>
        <p
          className="mx-auto mt-4"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-muted)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: '32rem',
          }}
        >
          No cookie-cutter plans. Every programme is built around your body, your schedule, and
          what you actually enjoy — so results stick.
        </p>
      </div>

      {/* ServicesSection uses hardcoded fallback data until Sanity is populated */}
      <ServicesSection />

      {/* Contact / booking CTA at the bottom of the services page */}
      <ContactSection />
    </main>
  )
}
