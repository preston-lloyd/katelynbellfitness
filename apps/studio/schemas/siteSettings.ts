import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'seo', title: 'SEO' },
    { name: 'social', title: 'Social' },
  ],
  fields: [
    defineField({
      name: 'general',
      type: 'object',
      group: 'general',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'logo',
          type: 'image',
        }),
        defineField({
          name: 'favicon',
          type: 'image',
        }),
        defineField({
          name: 'email',
          type: 'string',
        }),
        defineField({
          name: 'phone',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          type: 'text',
        }),
        defineField({
          name: 'image',
          type: 'image',
        }),
      ],
    }),
    defineField({
      name: 'social',
      type: 'object',
      group: 'social',
      fields: [
        defineField({
          name: 'facebook',
          type: 'string',
        }),
        defineField({
          name: 'instagram',
          type: 'string',
        }),
        defineField({
          name: 'x',
          type: 'string',
        }),
        defineField({
          name: 'youtube',
          type: 'string',
        }),
        defineField({
          name: 'tiktok',
          type: 'string',
        }),
      ],
    }),
  ],
})