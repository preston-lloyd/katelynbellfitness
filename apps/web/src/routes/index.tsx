import { createFileRoute } from '@tanstack/react-router'
import { fetchHomePage, type HomePage } from '#/lib/home'
import { fetchSiteSettings } from '#/lib/settings'
import { buildMeta, SITE_URL, CITY } from '#/lib/seo'
import Hero from '#/components/Hero'
import AboutSection from '#/components/AboutSection'
import ServicesSection from '#/components/ServicesSection'
import TestimonialsSection from '#/components/TestimonialsSection'
import ContactSection from '#/components/ContactSection'

// Fallback copy used when no Sanity SEO doc has been published yet.
// TODO: swap [City] for the real city name (or import CITY from '#/lib/seo')
const FALLBACK_TITLE = `Personal Trainer in ${CITY}, TN | ${import.meta.env?.VITE_SITE_NAME ?? 'Katelyn Bell Fitness'}`
const FALLBACK_DESC  =
  `NASM-certified personal trainer and nutrition coach in ${CITY}, TN. ` +
  '1-on-1 personal training, online coaching, and nutrition guidance tailored to your goals. ' +
  'Book a free consultation today.'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [homePage, siteSettings] = await Promise.all([
      fetchHomePage().catch(() => null),
      fetchSiteSettings(),
    ])
    return { homePage, siteSettings }
  },

  head: (ctx) => {
    const loaderData = ctx.loaderData as { homePage: HomePage | null }
    const seo = loaderData?.homePage?.seo

    return buildMeta({
      title:       seo?.title       ?? FALLBACK_TITLE,
      description: seo?.description ?? FALLBACK_DESC,
      canonical:   SITE_URL + '/',
      ogImage:     seo?.imageUrl,
      noIndex:     seo?.noIndex,
    })
  },

  component: HomePage,
})

function HomePage() {
  const { homePage } = Route.useLoaderData()

  return (
    <main>
      <Hero                data={homePage?.hero}         />
      <AboutSection        data={homePage?.about}        />
      <ServicesSection     data={homePage?.services}     />
      <TestimonialsSection data={homePage?.testimonials} />
      <ContactSection      data={homePage?.contact}      />
    </main>
  )
}
