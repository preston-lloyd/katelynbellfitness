import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero',         title: 'Hero',         default: true },
    { name: 'about',        title: 'About'         },
    { name: 'services',     title: 'Services'      },
    { name: 'testimonials', title: 'Testimonials'  },
    { name: 'contact',      title: 'Contact'       },
    { name: 'seo',          title: 'SEO'           },
  ],
  fields: [

    // ─── Hero ────────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'Main bold heading. Keep it punchy — 4–8 words.',
          validation: (r) => r.required().max(80),
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 3,
          description: 'Supporting paragraph below the headline.',
        }),
        defineField({
          name: 'primaryCtaText',
          title: 'Primary Button Text',
          type: 'string',
          description: 'e.g. "Start Your Journey"',
        }),
        defineField({
          name: 'primaryCtaLink',
          title: 'Primary Button Link',
          type: 'string',
          description: 'Path or URL, e.g. /consultation',
        }),
        defineField({
          name: 'secondaryCtaText',
          title: 'Secondary Button Text',
          type: 'string',
          description: 'e.g. "Explore Services"',
        }),
        defineField({
          name: 'secondaryCtaLink',
          title: 'Secondary Button Link',
          type: 'string',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Trainer Photo',
          type: 'image',
          options: { hotspot: true },
          description: 'Portrait-style photo shown on the right side of the hero.',
        }),
      ],
    }),

    // ─── About ───────────────────────────────────────────────────────────────
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      group: 'about',
      fields: [
        defineField({
          name: 'photo',
          title: 'Trainer Photo',
          type: 'image',
          options: { hotspot: true },
          description: 'Portrait-style photo. Shown on the left at ~3:4 aspect ratio.',
        }),
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          description: 'e.g. "Meet Your Coach, Katelyn Bell"',
        }),
        defineField({
          name: 'bio',
          title: 'Bio',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{ title: 'Normal', value: 'normal' }],
              marks: {
                decorators: [
                  { title: 'Bold', value: 'strong' },
                  { title: 'Italic', value: 'em' },
                ],
                annotations: [],
              },
            }),
          ],
          description: 'Multi-paragraph bio. Supports bold and italic.',
        }),
        defineField({
          name: 'credentials',
          title: 'Credentials & Certifications',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          description: 'One item per line, e.g. "NASM Certified Personal Trainer (CPT)".',
        }),
      ],
    }),

    // ─── Services ────────────────────────────────────────────────────────────
    defineField({
      name: 'services',
      title: 'Services Section',
      type: 'object',
      group: 'services',
      fields: [
        defineField({
          name: 'sectionHeading',
          title: 'Section Heading',
          type: 'string',
          description: 'e.g. "Coaching Built Around You"',
        }),
        defineField({
          name: 'items',
          title: 'Services',
          type: 'array',
          validation: (r) => r.max(6),
          of: [
            defineArrayMember({
              type: 'object',
              name: 'service',
              title: 'Service',
              preview: {
                select: { title: 'name', subtitle: 'description' },
              },
              fields: [
                defineField({
                  name: 'name',
                  title: 'Service Name',
                  type: 'string',
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Short Description',
                  type: 'text',
                  rows: 3,
                  validation: (r) => r.max(200),
                }),
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  description: 'Choose the icon that best represents this service.',
                  options: {
                    list: [
                      { title: 'Dumbbell — Personal Training', value: 'Dumbbell' },
                      { title: 'Monitor — Online Coaching',    value: 'MonitorSmartphone' },
                      { title: 'Salad — Nutrition',            value: 'Salad' },
                      { title: 'Heart — Wellness',             value: 'Heart' },
                      { title: 'Calendar — Scheduling',        value: 'CalendarDays' },
                      { title: 'Running — Cardio',             value: 'Footprints' },
                    ],
                  },
                }),
                defineField({
                  name: 'chipLabel',
                  title: 'Chip Label',
                  type: 'string',
                  description: 'Short badge shown on the card, e.g. "In-Person", "Remote", "Add-on".',
                }),
                defineField({
                  name: 'ctaLink',
                  title: 'Learn More Link',
                  type: 'string',
                  description: 'Path, e.g. /services or /services#personal-training',
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ─── Testimonials ─────────────────────────────────────────────────────────
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      group: 'testimonials',
      fields: [
        defineField({
          name: 'items',
          title: 'Testimonials',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'testimonial',
              title: 'Testimonial',
              preview: {
                select: { title: 'clientName', subtitle: 'quote' },
              },
              fields: [
                defineField({
                  name: 'quote',
                  title: 'Quote',
                  type: 'text',
                  rows: 4,
                  description: 'Write the quote without surrounding quotation marks — they are added automatically.',
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: 'clientName',
                  title: 'Client Name',
                  type: 'string',
                  validation: (r) => r.required(),
                }),
                defineField({
                  name: 'clientContext',
                  title: 'Context',
                  type: 'string',
                  description: 'e.g. "Personal Training · 6 months"',
                }),
                defineField({
                  name: 'clientPhoto',
                  title: 'Client Photo (optional)',
                  type: 'image',
                  options: { hotspot: true },
                  description: 'If left blank, initials will be shown instead.',
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ─── Contact ─────────────────────────────────────────────────────────────
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          description: 'e.g. "Let\'s Start Your Journey"',
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'bookingLink',
          title: 'Booking Link',
          type: 'url',
          description: 'Your Calendly or booking page URL.',
        }),
      ],
    }),

    // ─── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],

  preview: {
    select: { title: 'hero.headline' },
    prepare({ title }) {
      return { title: title ?? 'Home Page' }
    },
  },
})
