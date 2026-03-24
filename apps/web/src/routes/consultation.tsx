import { createFileRoute } from '@tanstack/react-router'
import { buildMeta, buildBreadcrumb, SITE_URL } from '#/lib/seo'
import ContactSection from '#/components/ContactSection'

export const Route = createFileRoute('/consultation')({
  head: () =>
    buildMeta({
      title:       'Book a Free Fitness Consultation | Katelyn Bell Fitness',
      description: 'Schedule a free 30-minute intro call with certified personal trainer Katelyn Bell. No commitment — just an honest conversation about your goals and how we can work together.',
      canonical:   `${SITE_URL}/consultation`,
    }),
  component: Consultation,
})

const breadcrumb = buildBreadcrumb([
  { name: 'Home',         item: SITE_URL },
  { name: 'Consultation', item: `${SITE_URL}/consultation` },
])

function Consultation() {
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
        <p className="label-kicker mb-4">Get Started</p>
        <h1
          className="section-heading mx-auto"
          style={{ fontSize: 'var(--text-h1)', color: 'var(--color-text)', maxWidth: '32rem' }}
        >
          Book a{' '}
          <span style={{ color: 'var(--color-primary)' }}>Free Consultation</span>
        </h1>
        <p
          className="mx-auto mt-4"
          style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-muted)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: '30rem',
          }}
        >
          A free 30-minute call with no strings attached. We&apos;ll talk through your goals,
          your current routine, and whether we&apos;re a good fit — no hard sell, ever.
        </p>
      </div>

      <ContactSection />
    </main>
  )
}
