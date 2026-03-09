import { createClient } from '@sanity/client'

// Vite only exposes VITE_* to the client; use the same vars on server for consistency
const projectId =
  (typeof process !== 'undefined'
    ? process.env.VITE_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID
    : import.meta.env?.VITE_SANITY_PROJECT_ID) ?? ''

const dataset =
  (typeof process !== 'undefined'
    ? process.env.VITE_SANITY_DATASET ?? process.env.SANITY_DATASET
    : import.meta.env?.VITE_SANITY_DATASET) ?? 'production'

if (!projectId || projectId === 'your-project-id') {
  throw new Error(
    'Missing Sanity project ID. Set VITE_SANITY_PROJECT_ID in apps/web/.env (see .env.example).',
  )
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
})