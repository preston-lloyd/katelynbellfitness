import { defineField, defineType } from 'sanity'

/**
 * Custom object type: Button (call-to-action).
 * Use defineType with type: 'object' for embedded types like buttons.
 */
export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'URL or path (e.g. /contact or https://...)',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
