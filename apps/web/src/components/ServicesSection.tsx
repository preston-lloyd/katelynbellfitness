import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  CalendarDays,
  Dumbbell,
  Footprints,
  Heart,
  type LucideIcon,
  MonitorSmartphone,
  Salad,
} from 'lucide-react'
import type { HomePage, ServiceItem } from '#/lib/home'
import { useReveal } from '#/hooks/useReveal'

// ─── Icon registry ────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Dumbbell,
  MonitorSmartphone,
  Salad,
  Heart,
  CalendarDays,
  Footprints,
}

// ─── Style palette ────────────────────────────────────────────────────────────
// Indexed by position so each card gets a distinct colour even without custom Sanity styling.

const CARD_STYLES = [
  {
    iconBg: 'var(--color-primary-subtle)',
    iconColor: 'var(--color-primary)',
    chipBg: 'var(--color-primary-subtle)',
    chipColor: 'var(--color-primary-dark)',
  },
  {
    iconBg: 'var(--color-secondary-subtle)',
    iconColor: 'var(--color-secondary)',
    chipBg: 'var(--color-secondary-subtle)',
    chipColor: 'var(--color-secondary)',
  },
  {
    iconBg: 'rgba(247, 201, 62, 0.15)',
    iconColor: '#8a6800',
    chipBg: 'rgba(247, 201, 62, 0.15)',
    chipColor: '#7a5e00',
  },
  {
    iconBg: 'var(--color-primary-subtle)',
    iconColor: 'var(--color-primary)',
    chipBg: 'var(--color-primary-subtle)',
    chipColor: 'var(--color-primary-dark)',
  },
  {
    iconBg: 'var(--color-secondary-subtle)',
    iconColor: 'var(--color-secondary)',
    chipBg: 'var(--color-secondary-subtle)',
    chipColor: 'var(--color-secondary)',
  },
  {
    iconBg: 'rgba(247, 201, 62, 0.15)',
    iconColor: '#8a6800',
    chipBg: 'rgba(247, 201, 62, 0.15)',
    chipColor: '#7a5e00',
  },
]

// ─── Fallback data ────────────────────────────────────────────────────────────

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    _key: 'personal-training',
    name: 'Personal Training',
    description:
      'One-on-one sessions built around your goals, fitness level, and schedule. Improve technique, build strength, and get results with hands-on coaching every step of the way.',
    icon: 'Dumbbell',
    chipLabel: 'In-Person',
    ctaLink: '/services',
  },
  {
    _key: 'online-coaching',
    name: 'Online Coaching',
    description:
      'A fully customised training programme delivered wherever you are — complete with weekly check-ins, progress tracking, and direct access to me whenever you need support.',
    icon: 'MonitorSmartphone',
    chipLabel: 'Remote',
    ctaLink: '/services',
  },
  {
    _key: 'nutrition',
    name: 'Nutrition Guidance',
    description:
      'Practical, sustainable nutrition coaching with no fad diets and no calorie obsessing. Just real food strategies that complement your training and fuel lasting results.',
    icon: 'Salad',
    chipLabel: 'Add-on',
    ctaLink: '/services',
  },
]

// ─── Card ─────────────────────────────────────────────────────────────────────

function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const Icon    = (item.icon && ICON_MAP[item.icon]) ?? Dumbbell
  const styles  = CARD_STYLES[index % CARD_STYLES.length]

  return (
    <article className="card group flex flex-col gap-6 p-7">
      {/* Icon + chip row */}
      <div className="flex items-start justify-between">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
          style={{ background: styles.iconBg }}
        >
          <Icon size={26} strokeWidth={1.75} style={{ color: styles.iconColor }} />
        </div>

        {item.chipLabel && (
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ background: styles.chipBg, color: styles.chipColor }}
          >
            {item.chipLabel}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2.5">
        <h3
          className="m-0 font-extrabold leading-snug"
          style={{
            fontSize: 'var(--text-h4)',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-text)',
          }}
        >
          {item.name}
        </h3>
        {item.description && (
          <p
            className="m-0 leading-relaxed"
            style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}
          >
            {item.description}
          </p>
        )}
      </div>

      {/* CTA — pushed to bottom */}
      <div className="mt-auto pt-1">
        <a
          href={item.ctaLink ?? '/services'}
          className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline"
          style={{ color: 'var(--color-primary)' }}
        >
          Learn more
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </div>
    </article>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ServicesSection({ data }: { data?: HomePage['services'] | null }) {
  const heading  = data?.sectionHeading
  const items    = data?.items?.length ? data.items : FALLBACK_SERVICES
  const revealRef = useReveal()

  return (
    <section
      ref={revealRef}
      aria-labelledby="services-heading"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="page-wrap" style={{ paddingBlock: 'var(--space-section-y)' }}>

        {/* ── Section header ── */}
        <div className="mb-14 text-center">
          <p className="label-kicker mb-4">What I Offer</p>
          <h2
            id="services-heading"
            className="section-heading mx-auto mb-4"
            style={{ fontSize: 'var(--text-h1)', color: 'var(--color-text)', maxWidth: '30rem' }}
          >
            {heading ? (
              heading
            ) : (
              <>
                Coaching Built{' '}
                <span style={{ color: 'var(--color-primary)' }}>Around You</span>
              </>
            )}
          </h2>
          <p
            className="mx-auto m-0"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-muted)',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: '34rem',
            }}
          >
            Every programme is tailored — no cookie-cutter plans, no one-size-fits-all approach.
            Choose the format that fits your life.
          </p>
        </div>

        {/* ── Card grid ── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ServiceCard key={item._key} item={item} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 text-center">
          <Link to="/services" className="btn-secondary">
            View Full Service Details
            <ArrowRight size={15} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}
