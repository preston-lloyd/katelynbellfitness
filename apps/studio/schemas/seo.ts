import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta title',
      type: 'string',
      description: 'Title for search results and browser tab. Recommended: 50–60 characters.',
      validation: (Rule) =>
        Rule.max(60).warning('Longer titles may be truncated in search results.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Summary for search results. Recommended: 150–160 characters.',
      validation: (Rule) =>
        Rule.max(160).warning(
          'Longer descriptions may be truncated in search results.',
        ),
    }),
    defineField({
      name: 'image',
      title: 'OG image',
      type: 'image',
      description: 'Image shown when this page is shared (e.g. social, messaging). Recommended: 1200×630px.',
    }),
    defineField({
      name: 'noIndex',
      title: 'No index',
      type: 'boolean',
      description: 'Ask search engines not to index this page.',
      initialValue: false,
    }),
  ],
})