import { createFileRoute, notFound } from '@tanstack/react-router'
import { fetchPostBySlug } from '#/lib/posts'
import { SITE_URL } from '#/lib/site'
import { PortableText } from '#/components/PortableText'

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = await fetchPostBySlug(params.slug)
    
    if (!post) {
      throw notFound()
    }
    
    return post
  },
  head: ({ loaderData, params }) => {
    const title = loaderData?.title ?? 'Post'
    const description = loaderData?.description ?? ''
    const image = loaderData?.imageUrl ?? '/images/lagoon-1.svg'
    return {
      links: [{ rel: 'canonical', href: `${SITE_URL}/blog/${params.slug}` }],
      meta: [
        { title },
        { name: 'description', content: description },
        {
          property: 'og:image',
          content: image.startsWith('http') ? image : `${SITE_URL}${image}`,
        },
      ],
    }
  },
  component: BlogPost,
})

function BlogPost() {
  const post = Route.useLoaderData()

  if (!post) {
    return null
  }

  return (
    <main className="page-wrap px-4 pb-12 pt-16">
      <article className="island-shell rounded-2xl p-6 sm:p-8">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt=""
            className="mb-6 h-64 w-full rounded-2xl object-cover"
          />
        ) : null}
        <p className="island-kicker mb-2">Post</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mb-6 text-sm text-[var(--sea-ink-soft)]">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
        <div className="prose prose-slate prose-headings:text-[var(--sea-ink)] prose-p:text-[var(--sea-ink-soft)] prose-li:text-[var(--sea-ink-soft)] prose-ul:text-[var(--sea-ink-soft)] prose-ol:text-[var(--sea-ink-soft)] prose-strong:text-[var(--sea-ink)] prose-a:text-[var(--lagoon-deep)] max-w-none">
          <PortableText value={post.body} />
        </div>
      </article>
    </main>
  )
}
