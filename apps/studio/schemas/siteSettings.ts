import { defineField, defineType, defineArrayMember } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'navigation', title: 'Navigation' },
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
      name: 'navigation',
      type: 'object',
      group: 'navigation',
      fields: [
        defineField({
          name: 'navigation',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'label',
                  type: 'string',
                }),
                defineField({
                  name: 'link',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
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