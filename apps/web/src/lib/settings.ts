import { sanityClient } from '#/lib/sanity'

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  general,
  navigation,
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
    logo: string
    favicon: string
    email: string
    phone: string
  }
  navigation: {
    label: string
    link: string
  }[]
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