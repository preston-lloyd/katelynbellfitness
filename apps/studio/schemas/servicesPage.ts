import { defineArrayMember, defineField, defineType } from 'sanity'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'services', title: 'Services' },
    { name: 'seo', title: 'SEO' },
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
          name: 'description',
          type: 'text',
        }),
        defineField({
          name: 'image',
          type: 'image',
        }),
        defineField({
          name: 'cta',
          title: 'Call To Action',
          type: 'button',
        }),
      ],
    }),
    defineField({
      name: 'services',
      type: 'array',
      group: 'services',
      of: [
        defineArrayMember({
          type: 'object',
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
            defineField({
                name: 'cta',
                title: 'Call To Action',
                type: 'button',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo'
    }),
  ],
})