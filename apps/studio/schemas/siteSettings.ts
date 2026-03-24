import { defineField, defineType, defineArrayMember } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general',    title: 'General',    default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'social',     title: 'Social'     },
    { name: 'seo',        title: 'SEO'        },
  ],
  fields: [

    // ─── General ─────────────────────────────────────────────────────────────
    defineField({
      name: 'general',
      title: 'General',
      type: 'object',
      group: 'general',
      fields: [
        defineField({ name: 'title', title: 'Site Title', type: 'string' }),
        defineField({ name: 'logo',    title: 'Logo',    type: 'image' }),
        defineField({ name: 'favicon', title: 'Favicon', type: 'image' }),
        defineField({ name: 'email',   title: 'Contact Email', type: 'string' }),
        defineField({ name: 'phone',   title: 'Phone',         type: 'string' }),
      ],
    }),

    // ─── Navigation ──────────────────────────────────────────────────────────
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      group: 'navigation',
      fields: [
        defineField({
          name: 'navigation',
          title: 'Nav Links',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Label', type: 'string' }),
                defineField({ name: 'link',  title: 'Path',  type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ─── Social ───────────────────────────────────────────────────────────────
    // Each social link is an object { name, url } to match the web SocialLink type.
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      group: 'social',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Display Name', type: 'string' }),
            defineField({ name: 'url',  title: 'Profile URL',  type: 'url'    }),
          ],
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Display Name', type: 'string' }),
            defineField({ name: 'url',  title: 'Profile URL',  type: 'url'    }),
          ],
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Display Name', type: 'string' }),
            defineField({ name: 'url',  title: 'Profile URL',  type: 'url'    }),
          ],
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Display Name', type: 'string' }),
            defineField({ name: 'url',  title: 'Profile URL',  type: 'url'    }),
          ],
        }),
        defineField({
          name: 'x',
          title: 'X (Twitter)',
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Display Name', type: 'string' }),
            defineField({ name: 'url',  title: 'Profile URL',  type: 'url'    }),
          ],
        }),
      ],
    }),

    // ─── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],

  preview: {
    select: { title: 'general.title' },
    prepare({ title }) {
      return { title: title ?? 'Site Settings' }
    },
  },
})
