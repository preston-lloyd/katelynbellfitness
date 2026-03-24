import { Link } from '@tanstack/react-router'
import FacebookIcon from '#/icons/Facebook'
import InstagramIcon from '#/icons/Instagram'
import XIcon from '#/icons/X'
import YoutubeIcon from '#/icons/YouTube'
import TiktokIcon from '#/icons/TikTok'
import type { SiteSettings } from '#/lib/settings'

const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'TikTok',    href: '#', Icon: TiktokIcon    },
  { label: 'YouTube',   href: '#', Icon: YoutubeIcon   },
  { label: 'Facebook',  href: '#', Icon: FacebookIcon  },
  { label: 'X',         href: '#', Icon: XIcon         },
]

const PAGE_LINKS = [
  { label: 'Home',     to: '/'            },
  { label: 'About',    to: '/about'       },
  { label: 'Services', to: '/services'    },
  { label: 'Blog',     to: '/blog'        },
  { label: 'FAQs',     to: '/faqs'        },
]

const SERVICE_LINKS = [
  { label: 'Personal Training',  to: '/services'     },
  { label: 'Online Coaching',    to: '/services'     },
  { label: 'Nutrition Guidance', to: '/services'     },
  { label: 'Free Consultation',  to: '/consultation' },
]

const footerLinkClass =
  'text-sm no-underline transition-colors hover:text-[var(--color-text)]'

export default function Footer({ settings }: { settings?: SiteSettings | null }) {
  const siteName = settings?.general?.title ?? 'Katelyn Bell Fitness'
  const year = new Date().getFullYear()

  return (
    <footer
      className="mt-24 border-t"
      style={{
        borderColor: 'var(--color-border)',
        background: 'var(--color-surface-muted)',
      }}
    >
      {/* ── Main columns ── */}
      <div className="page-wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2.5 no-underline w-fit">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold text-white"
              style={{ background: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
              aria-hidden="true"
            >
              KB
            </span>
            <span
              className="text-base font-extrabold leading-none tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
            >
              {siteName}
            </span>
          </Link>

          <p
            className="text-sm leading-relaxed max-w-[22rem]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Empowering women to build strength, confidence, and lasting habits
            through personalised fitness and nutrition coaching.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 mt-1">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <Icon width={16} height={16} fill="currentColor" />
              </a>
            ))}
          </div>
        </div>

        {/* Pages column */}
        <div className="flex flex-col gap-3">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: 'var(--color-text-soft)' }}
          >
            Pages
          </p>
          {PAGE_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={footerLinkClass}
              style={{ color: 'var(--color-text-muted)' }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Services column */}
        <div className="flex flex-col gap-3">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: 'var(--color-text-soft)' }}
          >
            Services
          </p>
          {SERVICE_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={footerLinkClass}
              style={{ color: 'var(--color-text-muted)' }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Contact column */}
        <div className="flex flex-col gap-3">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: 'var(--color-text-soft)' }}
          >
            Get in Touch
          </p>
          <a
            href="mailto:hello@katelynbellfitness.com"
            className={footerLinkClass}
            style={{ color: 'var(--color-text-muted)' }}
          >
            hello@katelynbellfitness.com
          </a>
          <a
            href="tel:+10000000000"
            className={footerLinkClass}
            style={{ color: 'var(--color-text-muted)' }}
          >
            +1 (000) 000-0000
          </a>
          <div className="mt-2">
            <Link
              to="/consultation"
              className="btn-primary text-sm"
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div
          className="page-wrap flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row"
          style={{ color: 'var(--color-text-soft)' }}
        >
          <p className="m-0">
            &copy; {year} {siteName}. All rights reserved.
          </p>
          <p className="m-0">
            Built with care in{' '}
            <span style={{ color: 'var(--color-text-muted)' }}>Springville, UT</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
