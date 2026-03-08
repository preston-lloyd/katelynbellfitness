import { createClient } from '@sanity/client'

const projectId =
  typeof process !== 'undefined'
    ? process.env.SANITY_PROJECT_ID ?? process.env.VITE_SANITY_PROJECT_ID
    : import.meta.env?.VITE_SANITY_PROJECT_ID

const dataset =
  typeof process !== 'undefined'
    ? process.env.SANITY_DATASET ?? process.env.VITE_SANITY_DATASET
    : import.meta.env?.VITE_SANITY_DATASET

export const sanityClient = createClient({
  projectId: projectId || 'your-project-id',
  dataset: dataset || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})