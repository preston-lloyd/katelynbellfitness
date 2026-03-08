import type { SiteSettings } from '#/lib/settings'
import SocialIcons from '#/components/SocialIcons'

export default function Footer({ settings }: { settings?: SiteSettings | null }) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} {settings?.general?.title}. All rights reserved.
        </p>
      </div>
      
      <SocialIcons social={settings?.social} className="mt-4" />
    </footer>
  )
}
