import { createFileRoute } from '@tanstack/react-router'
import { buildMeta, buildBreadcrumb, SITE_URL, CITY } from '#/lib/seo'
import AboutSection from '#/components/AboutSection'

export const Route = createFileRoute('/about')({
  head: () =>
    buildMeta({
      // TODO: refine once real bio copy is finalised
      title:       `About Katelyn Bell | NASM-Certified Personal Trainer in ${CITY}`,
      description: `Meet Katelyn Bell — NASM Certified Personal Trainer, Precision Nutrition Coach, and fitness expert helping women in ${CITY} build strength, confidence, and lasting results.`,
      canonical:   `${SITE_URL}/about`,
    }),
  component: About,
})

const breadcrumb = buildBreadcrumb([
  { name: 'Home',  item: SITE_URL },
  { name: 'About', item: `${SITE_URL}/about` },
])

function About() {
  return (
    <main>
      {/* BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Page-level h1 — AboutSection renders its own h2 heading below */}
      <div
        className="page-wrap text-center"
        style={{ paddingBlock: 'calc(var(--space-section-y) * 0.55)' }}
      >
        <p className="label-kicker mb-4">About</p>
        <h1
          className="section-heading mx-auto"
          style={{ fontSize: 'var(--text-h1)', color: 'var(--color-text)', maxWidth: '34rem' }}
        >
          {/* TODO: confirm city name */}
          NASM-Certified Personal Trainer{' '}
          <span style={{ color: 'var(--color-primary)' }}>in {CITY}, TN</span>
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
          Strength-focused, science-backed, and built around your life — not someone else&apos;s.
        </p>
      </div>

      {/* AboutSection handles photo, bio, credentials, and CTAs */}
      <AboutSection />
    </main>
  )
}
