// TODO: Replace with your confirmed production domain (no trailing slash)
export const SITE_URL = 'https://www.katelynbellfitness.com'

// TODO: Create a 1200×630px branded OG image at apps/web/public/og-image.jpg
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`

export const SITE_NAME = 'Katelyn Bell Fitness'

// TODO: replace [City] tokens throughout with the real city name (e.g. Nashville)
export const CITY = 'Springville' // used in keyword copy below

interface BuildMetaOptions {
  title: string
  description: string
  canonical: string
  ogImage?: string | null
  noIndex?: boolean
}

export function buildMeta({ title, description, canonical, ogImage, noIndex = false }: BuildMetaOptions) {
  const image = ogImage ?? DEFAULT_OG_IMAGE

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      // Robots — only written when noindex is explicitly requested
      ...(noIndex ? [{ name: 'robots', content: 'noindex, nofollow' as const }] : []),
      // Open Graph
      { property: 'og:type',         content: 'website'     },
      { property: 'og:site_name',    content: SITE_NAME     },
      { property: 'og:title',        content: title         },
      { property: 'og:description',  content: description   },
      { property: 'og:url',          content: canonical     },
      { property: 'og:image',        content: image         },
      { property: 'og:image:width',  content: '1200'        },
      { property: 'og:image:height', content: '630'         },
      { property: 'og:locale',       content: 'en_US'       },
      // Twitter / X Card
      { name: 'twitter:card',        content: 'summary_large_image' },
      { name: 'twitter:title',       content: title                 },
      { name: 'twitter:description', content: description           },
      { name: 'twitter:image',       content: image                 },
    ],
    links: [
      { rel: 'canonical', href: canonical },
    ],
  }
}

// ─── Breadcrumb JSON-LD helper ────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string
  item: string
}

export function buildBreadcrumb(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  }
}
