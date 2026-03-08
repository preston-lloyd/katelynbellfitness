import { sanityClient } from '#/lib/sanity'

export const homePageQuery = `*[_type == "homePage"][0]{
  hero,
  services,
  about,
  testimonials,
  seo
}`

export interface HomePage {
  hero: object | null
  services: object | null
  about: object | null
  testimonials: object | null
  seo: object | null
}

export async function fetchHomePage(): Promise<HomePage> {
  const result = await sanityClient.fetch<HomePage | null>(homePageQuery)

  if (!result) {
    throw new Error('Home page not found')
  }

  return result
}