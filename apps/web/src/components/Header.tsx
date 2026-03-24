import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import type { SiteSettings } from '#/lib/settings'

const NAV_LINKS = [
  { label: 'Home',         to: '/',             exact: true  },
  { label: 'About',        to: '/about',        exact: false },
  { label: 'Services',     to: '/services',     exact: false },
  { label: 'Testimonials', to: '/testimonials', exact: false },
  { label: 'Contact',      to: '/contact',      exact: false },
] as const

export default function Header({ settings }: { settings?: SiteSettings | null }) {
  const siteName = settings?.general?.title ?? 'Katelyn Bell Fitness'
  const [open, setOpen] = useState(false)

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        background: 'color-mix(in oklch, var(--color-bg) 90%, transparent)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="page-wrap flex items-center justify-between py-3.5 sm:py-4">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 no-underline"
          onClick={() => setOpen(false)}
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-extrabold text-white"
            style={{ background: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
            aria-hidden="true"
          >
            KB
          </span>
          <span
            className="hidden text-[15px] font-extrabold leading-none tracking-tight sm:block"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            {siteName}
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, to, exact }) => (
            <Link
              key={to}
              to={to}
              className="nav-link"
              activeProps={{ className: 'nav-link is-active' }}
              activeOptions={{ exact }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── CTA + hamburger ── */}
        <div className="flex items-center gap-2">
          <Link
            to="/consultation"
            className="btn-primary hidden text-sm md:inline-flex"
          >
            Book a Call
          </Link>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 md:hidden"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            {open
              ? <X size={18} strokeWidth={2} />
              : <Menu size={18} strokeWidth={2} />
            }
          </button>
        </div>
      </div>

      {/* ── Mobile menu (smooth height animation via grid trick) ── */}
      <div
        id="mobile-nav"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile navigation"
            className="page-wrap flex flex-col gap-0.5 pb-5 pt-1"
          >
            {NAV_LINKS.map(({ label, to, exact }) => (
              <Link
                key={to}
                to={to}
                className="rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                activeProps={{
                  className: 'rounded-lg px-3 py-2.5 text-sm font-semibold no-underline',
                  style: {
                    color: 'var(--color-primary)',
                    background: 'var(--color-primary-subtle)',
                  },
                }}
                activeOptions={{ exact }}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}

            <div className="mt-3 border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
              <Link
                to="/consultation"
                className="btn-primary w-full justify-center"
                onClick={() => setOpen(false)}
              >
                Book a Call
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
