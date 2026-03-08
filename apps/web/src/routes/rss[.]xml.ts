import { createFileRoute } from '@tanstack/react-router'
import { fetchPosts } from '#/lib/posts'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '#/lib/site'

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: async () => {
        const posts = await fetchPosts()
        const sorted = [...(posts ?? [])].sort(
          (a, b) =>
            new Date(b.publishedAt).valueOf() -
            new Date(a.publishedAt).valueOf(),
        )

        const items = sorted
          .map((post) => {
            const url = `${SITE_URL}/blog/${post.slug}`
            const description = post.description ?? ''
            return `<item><title><![CDATA[${post.title}]]></title><description><![CDATA[${description}]]></description><link>${url}</link><guid>${url}</guid><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate></item>`
          })
          .join('')

        const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title><![CDATA[${SITE_TITLE}]]></title><description><![CDATA[${SITE_DESCRIPTION}]]></description><link>${SITE_URL}</link>${items}</channel></rss>`

        return new Response(xml, {
          headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
          },
        })
      },
    },
  },
})
