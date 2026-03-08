import { sanityClient } from '#/lib/sanity'

const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "imageUrl": image.asset->url,
  "description": pt::text(body)[0...160]
}`

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "imageUrl": image.asset->url,
  "description": pt::text(body)[0...160],
  body
}`

export interface PostListItem {
  _id: string
  title: string
  slug: string
  publishedAt: string
  imageUrl: string | null
  description: string | null
}

export interface Post extends PostListItem {
  body: object[] | null
}

export async function fetchPosts(): Promise<PostListItem[]> {
  return sanityClient.fetch<PostListItem[]>(postsQuery)
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const result = await sanityClient.fetch<Post | null>(postBySlugQuery, {
    slug,
  })
  
  return result ?? null
}