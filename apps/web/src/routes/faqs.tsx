import { createFileRoute, Link } from '@tanstack/react-router'
import { buildMeta, buildBreadcrumb, SITE_URL } from '#/lib/seo'
import { ChevronDown } from 'lucide-react'

export const Route = createFileRoute('/faqs')({
  head: () =>
    buildMeta({
      title:       'FAQs — Personal Training & Online Coaching | Katelyn Bell Fitness',
      description: 'Answers to common questions about personal training, online coaching, nutrition guidance, pricing, and working with Katelyn Bell Fitness.',
      canonical:   `${SITE_URL}/faqs`,
    }),
  component: Faqs,
})

const breadcrumb = buildBreadcrumb([
  { name: 'Home', item: SITE_URL },
  { name: 'FAQs', item: `${SITE_URL}/faqs` },
])

// TODO: Replace with real FAQs pulled from Sanity once a faqs schema is added
const FAQS = [
  {
    q: 'Where do sessions take place?',
    a: 'In-person sessions are held at a private studio in Springville, UT. Online coaching works entirely remotely — all you need is an internet connection and space to train.',
  },
  {
    q: 'What fitness level do I need to be?',
    a: 'None at all. Whether you\'re completely new to exercise or returning after a long break, every programme is built from where you are right now — not where you think you should be.',
  },
  {
    q: 'How long before I start seeing results?',
    a: 'Most clients notice improved energy, strength, and confidence within the first four weeks. Visible body composition changes typically take 8–12 weeks of consistent work.',
  },
  {
    q: 'What does online coaching include?',
    a: 'A custom training programme delivered via app, weekly check-ins, nutrition guidance, video feedback on your form, and direct messaging access so you\'re never training alone.',
  },
  {
    q: 'Is nutrition guidance included in every package?',
    a: 'Nutrition guidance is available as a standalone service or as an add-on to any coaching package. Every client receives general healthy eating principles regardless of their package.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free 30-minute consultation — it\'s a no-pressure conversation about your goals, your schedule, and the best way I can help.',
  },
] as const

// FAQPage structured data — helps Google show questions directly in search results
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

function Faqs() {
  return (
    <main>
      {/* BreadcrumbList + FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="page-wrap" style={{ paddingBlock: 'var(--space-section-y)' }}>

        {/* Page header — h1 */}
        <div className="mb-14 text-center">
          <p className="label-kicker mb-4">Have Questions?</p>
          <h1
            className="section-heading mx-auto mb-4"
            style={{ fontSize: 'var(--text-h1)', color: 'var(--color-text)', maxWidth: '30rem' }}
          >
            Frequently Asked{' '}
            <span style={{ color: 'var(--color-primary)' }}>Questions</span>
          </h1>
          <p
            className="mx-auto m-0"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: '30rem',
            }}
          >
            Can&apos;t find what you&apos;re looking for?{' '}
            <Link to="/consultation" style={{ color: 'var(--color-primary)' }}>
              Book a free call
            </Link>{' '}
            and ask me directly.
          </p>
        </div>

        {/* FAQ list — h2 per question for correct heading hierarchy */}
        <dl
          className="mx-auto flex flex-col gap-0"
          style={{ maxWidth: '48rem' }}
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className="border-t"
              style={{ borderColor: 'var(--color-border)' }}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <dt>
                {/* h2 for correct heading hierarchy: page h1 → question h2 */}
                <h2
                  className="m-0"
                  style={{
                    fontSize: 'var(--text-body)',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 'var(--font-weight-semibold)',
                  }}
                  itemProp="name"
                >
                  <details className="group">
                    <summary
                      className="flex cursor-pointer list-none items-center justify-between gap-4 py-5"
                      style={{ color: 'var(--color-text)' }}
                    >
                      {q}
                      <ChevronDown
                        size={18}
                        strokeWidth={2}
                        className="shrink-0 transition-transform duration-200 group-open:rotate-180"
                        style={{ color: 'var(--color-text-soft)' }}
                        aria-hidden="true"
                      />
                    </summary>
                    <dd
                      className="m-0 pb-5 pr-8"
                      style={{
                        fontSize: 'var(--text-body)',
                        color: 'var(--color-text-muted)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <span itemProp="text">{a}</span>
                    </dd>
                  </details>
                </h2>
              </dt>
            </div>
          ))}
          {/* Close final divider */}
          <div className="border-t" style={{ borderColor: 'var(--color-border)' }} />
        </dl>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p
            className="mb-5"
            style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)' }}
          >
            Still have a question?
          </p>
          <Link to="/consultation" className="btn-primary">
            Book a Free Consultation
          </Link>
        </div>

      </div>
    </main>
  )
}
