import { sanityClient } from '#/lib/sanity'

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  general,
  navigation,
  seo,
  social
}`
  
export type SiteSettings = Awaited<ReturnType<typeof fetchSiteSettings>>

export async function fetchSiteSettings() {
  const result = await sanityClient.fetch(siteSettingsQuery)
  return result ?? null
}