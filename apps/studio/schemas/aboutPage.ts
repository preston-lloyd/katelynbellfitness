import { defineField, defineType, defineArrayMember } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
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
          type: 'cta',
        }),
        defineField({
          name: 'testimonials',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  type: 'image',
                }),
                defineField({
                  name: 'name',
                  type: 'string',
                }),
                defineField({
                  name: 'testimonial',
                  type: 'text',
                }),
              ],
            }),
          ],
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
  ],
})