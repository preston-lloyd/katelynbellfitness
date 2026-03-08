import { sanityClient } from '#/lib/sanity'

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  general,
  navigation,
  seo,
  social
}`
  
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
  social: {
    facebook: string
    instagram: string
    x: string
    youtube: string
    tiktok: string
  }
}

export async function fetchSiteSettings() {
  const result = await sanityClient.fetch(siteSettingsQuery)
  return result ?? null
}