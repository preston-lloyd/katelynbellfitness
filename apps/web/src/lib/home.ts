import { sanityClient } from '#/lib/sanity'

export const homePageQuery = `*[_type == "homePage"][0]{
  hero,
  services,
  about,
  testimonials,
  seo
}`

export interface HomePage {
  hero: {
    title: string
    description: string
    image: string
    cta: {
      label: string
      link: string
    }
  }
  services: {
    title: string
    services: {
      image: string
      title: string
      description: string
    }[]
    cta: {
      label: string
      link: string
    }
  }
  about: {
    title: string
    description: string
    image: string
    cta: {
      label: string
      link: string
    }
  }
  testimonials: {
    title: string
    testimonials: {
      image: string
      name: string
      testimonial: string
    }[]
    cta: {
      label: string
      link: string
    }
  }
  seo: {
    title: string
    description: string
    image: string
  }
}

export async function fetchHomePage(): Promise<HomePage> {
  const result = await sanityClient.fetch<HomePage | null>(homePageQuery)

  if (!result) {
    throw new Error('Home page not found')
  }

  return result
}