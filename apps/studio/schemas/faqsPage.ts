import { defineField, defineType, defineArrayMember } from "sanity";

export const faqsPage = defineType({
  name: 'faqsPage',
  title: 'FAQs Page',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'faqs', title: 'FAQs' },
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
      ],
    }),
    defineField({
      name: 'faqs',
      type: 'array',
      group: 'faqs',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
            }),
            defineField({
              name: 'answer',
              type: 'text',
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
  ],
})