import { CalendarDays, Mail, MapPin, Send } from 'lucide-react'
import type { HomePage } from '#/lib/home'
import { useReveal } from '#/hooks/useReveal'

// Shared input className
const field =
  'w-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(240,82,44,0.1)] focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2'

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@katelynbellfitness.com',
    href: 'mailto:hello@katelynbellfitness.com',
  },
  {
    icon: MapPin,
    label: 'Based in',
    value: 'Springville, UT',
    href: null,
  },
] as const

export default function ContactSection({ data }: { data?: HomePage['contact'] | null }) {
  const headline    = data?.headline
  const subheadline = data?.subheadline
  const bookingLink = data?.bookingLink ?? 'https://calendly.com'
  const revealRef   = useReveal()

  return (
    <section
      ref={revealRef}
      aria-labelledby="contact-heading"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="page-wrap" style={{ paddingBlock: 'var(--space-section-y)' }}>

        {/* ── Section header ── */}
        <div className="mb-14 text-center">
          <p className="label-kicker mb-4">Get in Touch</p>
          <h2
            id="contact-heading"
            className="section-heading mx-auto mb-4"
            style={{ fontSize: 'var(--text-h1)', color: 'var(--color-text)', maxWidth: '28rem' }}
          >
            {headline ? (
              headline
            ) : (
              <>
                Let&apos;s Start Your{' '}
                <span style={{ color: 'var(--color-primary)' }}>Journey</span>
              </>
            )}
          </h2>
          <p
            className="mx-auto m-0"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: '30rem',
            }}
          >
            {subheadline ??
              'Have a question, want to know more about coaching, or just not sure where to start? Send me a message — I read every one.'}
          </p>
        </div>

        {/* ── Two-column body ── */}
        <div className="grid items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">

          {/* ── Left: info + booking ── */}
          <div className="flex flex-col gap-8">

            {/* Contact items */}
            <div className="flex flex-col gap-5">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: 'var(--color-primary-subtle)' }}
                  >
                    <Icon size={18} strokeWidth={2} style={{ color: 'var(--color-primary)' }} />
                  </span>
                  <div>
                    <p
                      className="m-0 text-xs font-semibold uppercase tracking-widest"
                      style={{ color: 'var(--color-text-soft)' }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium no-underline hover:underline"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="m-0 text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Response time note */}
              <p
                className="m-0 flex items-center gap-2 text-xs"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: '#22c55e' }}
                  aria-hidden="true"
                />
                Typically responds within 24 hours
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--color-border)' }} />

            {/* Booking CTA card */}
            <div
              className="rounded-2xl border p-6"
              style={{
                background: 'var(--color-bg)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: 'var(--color-secondary-subtle)' }}
                >
                  <CalendarDays
                    size={18}
                    strokeWidth={2}
                    style={{ color: 'var(--color-secondary)' }}
                  />
                </span>
                <div>
                  <p
                    className="m-0 text-sm font-bold leading-tight"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Prefer to book directly?
                  </p>
                  <p className="m-0 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    30-minute intro call · No commitment
                  </p>
                </div>
              </div>

              <a
                href={bookingLink}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full justify-center text-sm"
              >
                Book a Free Consultation
              </a>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div
            className="rounded-2xl border p-5 sm:p-7 md:p-9"
            style={{
              background: 'var(--color-bg)',
              borderColor: 'var(--color-border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <form
              aria-label="Contact form"
              onSubmit={(e) => e.preventDefault()}
              noValidate
            >
              <div className="flex flex-col gap-5">

                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-semibold"
                      style={{ color: 'var(--color-text)' }}
                    >
                      Full Name{' '}
                      <span style={{ color: 'var(--color-primary)' }} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Jane Smith"
                      className={field}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-semibold"
                      style={{ color: 'var(--color-text)' }}
                    >
                      Email{' '}
                      <span style={{ color: 'var(--color-primary)' }} aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="jane@example.com"
                      className={field}
                    />
                  </div>
                </div>

                {/* Interest select */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-interest"
                    className="text-sm font-semibold"
                    style={{ color: 'var(--color-text)' }}
                  >
                    I&apos;m interested in
                  </label>
                  <select
                    id="contact-interest"
                    name="interest"
                    className={field}
                    defaultValue=""
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select a service…</option>
                    <option value="personal-training">Personal Training</option>
                    <option value="online-coaching">Online Coaching</option>
                    <option value="nutrition">Nutrition Guidance</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-semibold"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Message{' '}
                    <span style={{ color: 'var(--color-primary)' }} aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me a little about your goals, where you're starting from, or anything else you'd like me to know…"
                    className={`${field} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button type="submit" className="btn-primary w-full justify-center">
                  <Send size={15} strokeWidth={2.5} />
                  Send Message
                </button>

                <p
                  className="m-0 text-center text-xs"
                  style={{ color: 'var(--color-text-soft)' }}
                >
                  Your details are kept private and never shared.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
