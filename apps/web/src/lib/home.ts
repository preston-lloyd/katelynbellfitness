import { sanityClient } from '#/lib/sanity'

export const homePageQuery = `*[_type == "homePage"][0]{
  hero{
    headline,
    subheadline,
    primaryCtaText,
    primaryCtaLink,
    secondaryCtaText,
    secondaryCtaLink,
    "backgroundImageUrl": backgroundImage.asset->url,
    "backgroundImageLqip": backgroundImage.asset->metadata.lqip
  },
  about{
    heading,
    bio,
    credentials,
    "photoUrl": photo.asset->url,
    "photoLqip": photo.asset->metadata.lqip
  },
  services{
    sectionHeading,
    "items": items[]{
      _key,
      name,
      description,
      icon,
      chipLabel,
      ctaLink
    }
  },
  testimonials{
    "items": items[]{
      _key,
      quote,
      clientName,
      clientContext,
      "clientPhotoUrl": clientPhoto.asset->url
    }
  },
  contact{
    headline,
    subheadline,
    bookingLink
  },
  seo
}`

export interface ServiceItem {
  _key: string
  name: string
  description?: string
  icon?: string
  chipLabel?: string
  ctaLink?: string
}

export interface TestimonialItem {
  _key: string
  quote: string
  clientName: string
  clientContext?: string
  clientPhotoUrl?: string | null
}

export interface HomePage {
  hero?: {
    headline?: string
    subheadline?: string
    primaryCtaText?: string
    primaryCtaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    backgroundImageUrl?: string | null
    backgroundImageLqip?: string | null
  }
  about?: {
    heading?: string
    bio?: unknown[]  // Portable Text blocks — render with @portabletext/react
    credentials?: string[]
    photoUrl?: string | null
    photoLqip?: string | null
  }
  services?: {
    sectionHeading?: string
    items?: ServiceItem[]
  }
  testimonials?: {
    items?: TestimonialItem[]
  }
  contact?: {
    headline?: string
    subheadline?: string
    bookingLink?: string
  }
  seo?: {
    title?: string
    description?: string
    image?: unknown
    noIndex?: boolean
  }
}

export async function fetchHomePage(): Promise<HomePage> {
  const result = await sanityClient.fetch<HomePage | null>(homePageQuery)

  if (!result) {
    throw new Error('Home page not found')
  }

  return result
}
