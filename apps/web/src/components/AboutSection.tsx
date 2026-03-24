import { Link } from '@tanstack/react-router'
import { ArrowRight, BadgeCheck, ImagePlus } from 'lucide-react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { HomePage } from '#/lib/home'
import { useReveal } from '#/hooks/useReveal'

const FALLBACK_CREDENTIALS = [
  'NASM Certified Personal Trainer (CPT)',
  'Precision Nutrition Level 1 Coach',
  'Certified Strength & Conditioning Specialist (CSCS)',
  'Pre & Postnatal Fitness Specialist',
  '5+ Years of 1-on-1 Coaching Experience',
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

function Checkmark() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path
        d="M1.5 5.5L4.5 8.5L9.5 2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const bioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="m-0" style={{ color: 'var(--color-text-muted)' }}>
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ color: 'var(--color-text)', fontWeight: 700 }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em style={{ color: 'var(--color-text)', fontStyle: 'italic' }}>{children}</em>
    ),
  },
}

export default function AboutSection({ data }: { data?: HomePage['about'] | null }) {
  const heading     = data?.heading
  const bio         = data?.bio
  const credentials = data?.credentials?.length ? data.credentials : FALLBACK_CREDENTIALS
  const photoUrl    = data?.photoUrl
  const photoLqip   = data?.photoLqip
  const revealRef   = useReveal()

  return (
    <section
      ref={revealRef}
      aria-labelledby="about-heading"
      style={{ background: 'var(--color-surface)' }}
    >
      <div className="page-wrap" style={{ paddingBlock: 'var(--space-section-y)' }}>
        <div className="grid items-center gap-14 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24">

          {/* ── Photo column ── */}
          <div className="mx-auto w-full max-w-[300px] pb-6 pr-5 lg:mx-0 lg:max-w-none">
            <div className="relative">
              {/* Offset backing shape */}
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem]"
                style={{ background: 'var(--color-primary)', opacity: 0.13 }}
                aria-hidden="true"
              />

              {/* Photo frame */}
              {photoUrl ? (
                <div
                  className="relative overflow-hidden rounded-[1.75rem]"
                  style={{
                    aspectRatio: '3 / 4',
                    backgroundImage: photoLqip ? `url(${photoLqip})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                  }}
                >
                  <img
                    src={photoUrl}
                    alt="Katelyn Bell — personal trainer"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </div>
              ) : (
                <div
                  className="relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-[1.75rem] border-2 border-dashed"
                  style={{
                    aspectRatio: '3 / 4',
                    borderColor: 'rgba(240, 82, 44, 0.22)',
                    background: 'var(--color-bg-alt)',
                  }}
                  role="img"
                  aria-label="Katelyn Bell — trainer photo coming soon"
                >
                  <ImagePlus
                    size={30}
                    strokeWidth={1.5}
                    style={{ color: 'var(--color-primary)', opacity: 0.5 }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'var(--color-primary)', opacity: 0.6 }}
                  >
                    Trainer Photo
                  </span>
                </div>
              )}

              {/* StarBurst — top-left accent */}
              <StarBurst
                size={26}
                className="absolute -left-5 -top-5"
                style={{ color: 'var(--color-accent-yellow)' }}
              />

              {/* Floating years badge — top-right */}
              <div
                className="absolute -right-5 top-8 rounded-xl border px-3.5 py-3 text-center"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <p
                  className="m-0 font-extrabold leading-none"
                  style={{
                    fontSize: 'var(--text-h3)',
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--color-primary)',
                  }}
                >
                  5+
                </p>
                <p className="m-0 mt-1 text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  Years Exp.
                </p>
              </div>

              {/* Floating certification badge — bottom-right */}
              <div
                className="absolute -bottom-6 -right-5 flex items-center gap-2.5 rounded-xl border px-3.5 py-3"
                style={{
                  background: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'var(--color-secondary-subtle)' }}
                >
                  <BadgeCheck size={16} strokeWidth={2} style={{ color: 'var(--color-secondary)' }} />
                </span>
                <div>
                  <p
                    className="m-0 text-[13px] font-bold leading-none"
                    style={{ color: 'var(--color-text)' }}
                  >
                    NASM Certified
                  </p>
                  <p className="m-0 mt-1 text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                    Personal Trainer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Content column ── */}
          <div>
            <p className="label-kicker mb-4">About Me</p>

            <h2
              id="about-heading"
              className="section-heading mb-7"
              style={{ fontSize: 'var(--text-h1)', color: 'var(--color-text)' }}
            >
              {heading ? (
                heading
              ) : (
                <>
                  Meet Your Coach,{' '}
                  <span className="block sm:inline" style={{ color: 'var(--color-primary)' }}>
                    Katelyn Bell
                  </span>
                </>
              )}
            </h2>

            {/* Bio */}
            <div
              className="mb-8 flex flex-col gap-4"
              style={{
                color: 'var(--color-text-muted)',
                fontSize: 'var(--text-body)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {bio?.length ? (
                <PortableText value={bio} components={bioComponents} />
              ) : (
                <>
                  <p className="m-0">
                    Hi, I&apos;m Katelyn — a certified personal trainer and nutrition coach based in
                    Nashville, TN. I&apos;ve spent the last five years helping women of all fitness
                    levels build sustainable habits, get stronger, and feel genuinely confident in
                    their bodies.
                  </p>
                  <p className="m-0">
                    My approach isn&apos;t about quick fixes or punishing workouts. Real, lasting
                    transformation happens when training and nutrition feel like something you do{' '}
                    <em style={{ color: 'var(--color-text)', fontStyle: 'italic' }}>for</em> yourself
                    — not{' '}
                    <em style={{ color: 'var(--color-text)', fontStyle: 'italic' }}>to</em> yourself.
                    Every programme I design is built around your life, your schedule, and what you
                    actually enjoy.
                  </p>
                  <p className="m-0">
                    Whether you&apos;re brand new to fitness or coming back after a long break,
                    I&apos;d love to be part of your journey. Let&apos;s figure out what works for
                    you and build from there.
                  </p>
                </>
              )}
            </div>

            {/* Credentials */}
            <ul
              className="mb-10 flex flex-col gap-3"
              style={{ listStyle: 'none', padding: 0, margin: 0 }}
              aria-label="Qualifications and certifications"
            >
              {credentials.map((cred) => (
                <li key={cred} className="flex items-center gap-3">
                  <span
                    className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: 'var(--color-primary-subtle)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    <Checkmark />
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                    {cred}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <Link to="/about" className="btn-secondary mr-3">
              Read Full Story
            </Link>
            <Link to="/consultation" className="btn-primary">
              Work With Me
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
