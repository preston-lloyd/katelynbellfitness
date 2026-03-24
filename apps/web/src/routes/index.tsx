import { createFileRoute } from '@tanstack/react-router'
import { fetchHomePage } from '#/lib/home'
import { fetchSiteSettings } from '#/lib/settings'
import Hero from '#/components/Hero'
import AboutSection from '#/components/AboutSection'
import ServicesSection from '#/components/ServicesSection'
import TestimonialsSection from '#/components/TestimonialsSection'
import ContactSection from '#/components/ContactSection'

export const Route = createFileRoute('/')({
  loader: async () => {
    const [homePage, siteSettings] = await Promise.all([
      // Catch so the page renders even before Sanity is configured
      fetchHomePage().catch(() => null),
      fetchSiteSettings(),
    ])
    return { homePage, siteSettings }
  },
  head: () => ({}),
  component: HomePage,
})

function HomePage() {
  const { homePage } = Route.useLoaderData()

  return (
    <main>
      <Hero            data={homePage?.hero}         />
      <AboutSection    data={homePage?.about}        />
      <ServicesSection data={homePage?.services}     />
      <TestimonialsSection data={homePage?.testimonials} />
      <ContactSection  data={homePage?.contact}      />
    </main>
  )
}
