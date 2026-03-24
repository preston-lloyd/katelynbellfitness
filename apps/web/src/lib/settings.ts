import { sanityClient } from '#/lib/sanity'

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  general{
    title,
    logo,
    favicon,
    email,
    phone,
    "logoUrl": logo.asset->url,
    "faviconUrl": favicon.asset->url
  },
  navigation{
    navigation[]{
      _key,
      label,
      link
    }
  },
  seo,
  social
}`

export interface SocialLink {
  name: string
  url: string
}

export interface SocialLinks {
  facebook: SocialLink
  instagram: SocialLink
  x: SocialLink
  youtube: SocialLink
  tiktok: SocialLink
}
  
export interface SiteSettings {
  general: {
    title: string
    logo?: string | null
    favicon?: string | null
    email?: string | null
    phone?: string | null
    logoUrl?: string | null
    faviconUrl?: string | null
  }
  navigation: {
    navigation?: {
      _key: string
      label: string
      link: string
    }[]
  }
  seo: {
    title: string
    description: string
    image: string
  }
  social: SocialLinks
}

export async function fetchSiteSettings() {
  const result = await sanityClient.fetch(siteSettingsQuery)

  return result ?? null
}