import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2, ImagePlus, Star } from 'lucide-react'
import type { HomePage } from '#/lib/home'

const STATS = [
  { value: '200+', label: 'Women Coached'    },
  { value: '5+',   label: 'Years Experience' },
  { value: '4.9',  label: 'Average Rating'   },
] as const

function StarBurst({
  size = 32,
  className,
  style,
}: {
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z" />
    </svg>
  )
}

export default function Hero({ data }: { data?: HomePage['hero'] | null }) {
  const headline        = data?.headline
  const subheadline     = data?.subheadline
  const primaryText     = data?.primaryCtaText  ?? 'Start Your Journey'
  const primaryLink     = data?.primaryCtaLink  ?? '/consultation'
  const secondaryText   = data?.secondaryCtaText ?? 'Explore Services'
  const secondaryLink   = data?.secondaryCtaLink ?? '/services'
  const imageUrl        = data?.backgroundImageUrl
  const imageLqip       = data?.backgroundImageLqip

  return (
    <section
      className="flex flex-col overflow-hidden lg:grid lg:grid-cols-[55fr_45fr] lg:min-h-[calc(100svh-4rem)]"
      aria-label="Hero"
    >
      {/* ─── Content column ─── */}
      <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:px-14 lg:px-16 xl:px-20 lg:py-20">

        <p className="label-kicker mb-5">
          Certified Personal Trainer &amp; Nutrition Coach
        </p>

        <h1
          className="display-title mb-6"
          style={{ fontSize: 'var(--text-display-xl)', color: 'var(--color-text)' }}
        >
          {headline ? (
            headline
          ) : (
            <>
              Don&apos;t Give Up
              <br />
              <span style={{ color: 'var(--color-primary)' }}>On Your Goals</span>
            </>
          )}
        </h1>

        <p
          className="mb-10 max-w-[26rem] leading-relaxed"
          style={{ fontSize: 'var(--text-body-lg)', color: 'var(--color-text-muted)' }}
        >
          {subheadline ??
            'Personalised fitness and nutrition coaching built around your body, your schedule, and your goals — whether you\'re just starting out or ready to break through a plateau.'}
        </p>

        {/* CTAs — use <a> for CMS-driven links to avoid TanStack Router type errors */}
        <div className="mb-14 flex flex-wrap items-center gap-3">
          {data ? (
            <a href={primaryLink} className="btn-primary">
              {primaryText}
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          ) : (
            <Link to="/consultation" className="btn-primary">
              {primaryText}
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          )}
          {data ? (
            <a href={secondaryLink} className="btn-secondary">{secondaryText}</a>
          ) : (
            <Link to="/services" className="btn-secondary">{secondaryText}</Link>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-5 sm:gap-x-0">
          {STATS.map(({ value, label }, i) => (
            <Fragment key={label}>
              {i > 0 && (
                <div
                  className="mx-7 hidden h-9 w-px self-center sm:block"
                  style={{ background: 'var(--color-border)' }}
                />
              )}
              <div>
                <p
                  className="m-0 font-extrabold leading-none tabular-nums"
                  style={{
                    fontSize: 'var(--text-h3)',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-text)',
                  }}
                >
                  {value}
                </p>
                <p
                  className="m-0 mt-1 text-xs font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {label}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* ─── Photo / decorative column ─── */}
      <div
        className="relative min-h-[300px] overflow-hidden lg:min-h-0"
        style={{ background: imageUrl ? undefined : 'var(--color-bg-alt)' }}
        role={imageUrl ? undefined : 'img'}
        aria-label={imageUrl ? undefined : 'Trainer photo — coming soon'}
      >
        {/* Soft background blobs — hidden once a real photo loads */}
        {!imageUrl && (
          <>
            <div
              className="pointer-events-none absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full"
              style={{
                background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 68%)',
                opacity: 0.16,
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-1/4 -left-1/4 h-2/3 w-2/3 rounded-full"
              style={{
                background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 68%)',
                opacity: 0.12,
              }}
            />
          </>
        )}

        {/* Photo or placeholder */}
        {imageUrl ? (
          <div
            className="absolute inset-0"
            style={
              imageLqip
                ? { backgroundImage: `url(${imageLqip})`, backgroundSize: 'cover', backgroundPosition: 'top center' }
                : undefined
            }
          >
            <img
              src={imageUrl}
              alt="Katelyn Bell — personal trainer"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex flex-col items-center justify-center gap-3 rounded-t-[200px] rounded-b-3xl border-2 border-dashed"
              style={{
                width: 'clamp(8rem, 20vw, 13rem)',
                height: 'clamp(12rem, 30vw, 21rem)',
                borderColor: 'rgba(240, 82, 44, 0.28)',
                background: 'rgba(240, 82, 44, 0.05)',
              }}
            >
              <ImagePlus
                size={28}
                strokeWidth={1.5}
                style={{ color: 'var(--color-primary)', opacity: 0.55 }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: 'var(--color-primary)', opacity: 0.6 }}
              >
                Trainer Photo
              </span>
            </div>
          </div>
        )}

        {/* Decorative accents */}
        <StarBurst
          size={34}
          className="absolute right-8 top-8"
          style={{ color: 'var(--color-primary)' }}
        />
        <StarBurst
          size={22}
          className="absolute bottom-[5.5rem] right-5"
          style={{ color: 'var(--color-accent-yellow)' }}
        />
        <StarBurst
          size={16}
          className="absolute left-7 top-[40%]"
          style={{ color: 'var(--color-secondary)', opacity: 0.45 }}
        />

        {/* Floating consultation badge */}
        <div
          className="absolute bottom-7 left-6 flex items-center gap-3 rounded-xl border px-4 py-3"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: 'var(--color-primary-subtle)' }}
          >
            <CheckCircle2 size={16} strokeWidth={2} style={{ color: 'var(--color-primary)' }} />
          </span>
          <div>
            <p
              className="m-0 text-[13px] font-bold leading-none"
              style={{ color: 'var(--color-text)' }}
            >
              Free Consultation
            </p>
            <p className="m-0 mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              No commitment needed
            </p>
          </div>
        </div>

        {/* Floating rating badge */}
        <div
          className="absolute right-5 top-[28%] flex items-center gap-2 rounded-xl border px-3 py-2.5"
          style={{
            background: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="flex gap-px">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                fill="currentColor"
                strokeWidth={0}
                style={{ color: 'var(--color-accent-yellow)' }}
              />
            ))}
          </div>
          <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>
            4.9 / 5.0
          </span>
        </div>
      </div>
    </section>
  )
}
