import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import type { HomePage, TestimonialItem } from '#/lib/home'
import { useReveal } from '#/hooks/useReveal'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const AVATAR_COLORS = ['#f0522c', '#1a6b58', '#9878d6', '#0d7a99', '#c44d19', '#6b4ca8']

function getAvatarColor(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length]
}

// ─── Fallback data ────────────────────────────────────────────────────────────

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    _key: 'sarah',
    clientName: 'Sarah M.',
    clientContext: 'Personal Training · 6 months',
    quote:
      "I'd tried every gym programme going and never stuck to one for more than six weeks. Working with Katelyn changed everything — her approach finally clicked with how I actually live.",
    clientPhotoUrl: null,
  },
  {
    _key: 'rachel',
    clientName: 'Rachel T.',
    clientContext: 'Online Coaching · 1 year',
    quote:
      "Online coaching sounded too impersonal, but Katelyn is as present and supportive as any in-person trainer I've had. My squat went up 30 kg and I genuinely love training now.",
    clientPhotoUrl: null,
  },
  {
    _key: 'emily',
    clientName: 'Emily K.',
    clientContext: 'Postnatal Programme · 8 months',
    quote:
      "After having my second baby I felt completely lost in the gym. Katelyn's postnatal programme gave me structure, confidence, and honestly my strongest body yet.",
    clientPhotoUrl: null,
  },
]

// ─── Card ─────────────────────────────────────────────────────────────────────

function TestimonialCard({ t, index }: { t: TestimonialItem; index: number }) {
  const initials    = getInitials(t.clientName)
  const avatarColor = getAvatarColor(index)

  return (
    <article className="card flex h-full flex-col p-7">
      {/* Opening quote mark */}
      <span
        className="mb-4 block select-none font-extrabold leading-none"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '4rem',
          lineHeight: 0.75,
          color: 'var(--color-primary)',
        }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Stars */}
      <div className="mb-4 flex gap-0.5" role="img" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            strokeWidth={0}
            fill="currentColor"
            style={{ color: 'var(--color-accent-yellow)' }}
          />
        ))}
      </div>

      {/* Quote */}
      <p
        className="m-0 flex-1 leading-relaxed"
        style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text)',
          lineHeight: 'var(--leading-relaxed)',
        }}
      >
        {t.quote}
      </p>

      {/* Attribution */}
      <div
        className="mt-6 flex items-center gap-3 border-t pt-5"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {t.clientPhotoUrl ? (
          <img
            src={t.clientPhotoUrl}
            alt={t.clientName}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: avatarColor }}
            aria-hidden="true"
          >
            {initials}
          </span>
        )}

        <div>
          <p className="m-0 text-sm font-bold leading-tight" style={{ color: 'var(--color-text)' }}>
            {t.clientName}
          </p>
          {t.clientContext && (
            <p className="m-0 mt-0.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {t.clientContext}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function TestimonialsSection({
  data,
}: {
  data?: HomePage['testimonials'] | null
}) {
  const items     = data?.items?.length ? data.items : FALLBACK_TESTIMONIALS
  const revealRef = useReveal()

  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const total = items.length

  function goTo(i: number) {
    const next = Math.max(0, Math.min(i, total - 1))
    setActive(next)
    const track = trackRef.current
    if (!track) return
    const card = track.children[next] as HTMLElement | undefined
    if (card) track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' })
  }

  // Sync dot when user swipes manually
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function onScroll() {
      const { scrollLeft } = track!
      let closest = 0
      let minDist = Infinity
      Array.from(track!.children).forEach((child, i) => {
        const dist = Math.abs((child as HTMLElement).offsetLeft - scrollLeft)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      setActive(closest)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  // Reset active index if items change
  useEffect(() => { setActive(0) }, [items])

  return (
    <section
      ref={revealRef}
      aria-labelledby="testimonials-heading"
      style={{ background: 'var(--color-bg-inverse)' }}
    >
      <div className="page-wrap" style={{ paddingBlock: 'var(--space-section-y)' }}>

        {/* ── Section header ── */}
        <div className="mb-12 text-center">
          <p className="label-kicker mb-4">Client Results</p>

          <h2
            id="testimonials-heading"
            className="section-heading mx-auto mb-4"
            style={{
              fontSize: 'var(--text-h1)',
              color: 'var(--color-text-on-dark)',
              maxWidth: '30rem',
            }}
          >
            Real People,{' '}
            <span style={{ color: 'var(--color-primary-light)' }}>Real Results</span>
          </h2>

          <p
            className="mx-auto m-0"
            style={{
              fontSize: 'var(--text-body)',
              color: 'rgba(253, 250, 246, 0.65)',
              lineHeight: 'var(--leading-relaxed)',
              maxWidth: '32rem',
            }}
          >
            Don&apos;t take my word for it — here&apos;s what clients have said about working
            together.
          </p>
        </div>

        {/* ── Carousel track ── */}
        <div
          ref={trackRef}
          className={[
            'flex gap-6',
            'overflow-x-auto scroll-smooth',
            '[scroll-snap-type:x_mandatory]',
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            '-mx-6 px-6 sm:-mx-10 sm:px-10 md:-mx-14 md:px-14 lg:mx-0 lg:px-0',
          ].join(' ')}
        >
          {items.map((t, i) => (
            <div
              key={t._key}
              className={[
                '[scroll-snap-align:start]',
                'flex shrink-0',
                'w-[85vw] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]',
              ].join(' ')}
            >
              <TestimonialCard t={t} index={i} />
            </div>
          ))}
        </div>

        {/* ── Navigation (hidden on desktop) ── */}
        <div className="mt-8 flex items-center justify-center gap-5 lg:hidden">

          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
            style={{
              borderColor: 'rgba(253, 250, 246, 0.25)',
              color: 'var(--color-text-on-dark)',
            }}
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
            {items.map((t, i) => (
              <button
                key={t._key}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width:  i === active ? '1.5rem' : '0.5rem',
                  height: '0.5rem',
                  background: i === active ? 'var(--color-primary)' : 'rgba(253, 250, 246, 0.3)',
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === total - 1}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors disabled:opacity-30"
            style={{
              borderColor: 'rgba(253, 250, 246, 0.25)',
              color: 'var(--color-text-on-dark)',
            }}
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>

      </div>
    </section>
  )
}
