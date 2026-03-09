import type { SiteSettings } from '#/lib/settings'
import { SITE_URL } from '#/lib/site'

interface LocalBusinessJsonLdProps {
  settings: SiteSettings | null
}

export function LocalBusinessJsonLd({ settings }: LocalBusinessJsonLdProps) {
  if (!settings?.general) {
    return null
  }

  const { title, phone, email, logoUrl } = settings.general
  const image = logoUrl || undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: title || 'Katelyn Bell Fitness',
    url: SITE_URL,
    ...(phone && { telephone: phone }),
    ...(email && { email }),
    ...(image && { image }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Provo',
      addressRegion: 'UT',
      postalCode: '84604',
    },
    areaServed: 'Provo, UT',
    priceRange: '$$',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
