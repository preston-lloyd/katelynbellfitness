import { defineField, defineType, defineArrayMember } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'services', title: 'Services' },
    { name: 'about', title: 'About' },
    { name: 'testimonials', title: 'Testimonials' },
  ],
  fields: [
    defineField({
        name: "hero",
        type: "object",
        group: "hero",
        fields: [
            defineField({
                name: "title",
                type: "string",
            }),
            defineField({
                name: "description",
                type: "text",
            }),
            defineField({
                name: "image",
                type: "image",
            }),
            defineField({
                name: "cta",
                type: "cta",
            }),
        ],
    }),
    defineField({
        name: "services",
        type: "object",
        group: "services",
        fields: [
            defineField({
                name: "title",
                type: "string",
            }),
            defineField({
                name: "services",
                type: "array",
                of: [
                    defineArrayMember({
                        type: "object",
                        fields: [
                            defineField({
                                name: "image",
                                type: "image",
                            }),
                            defineField({
                                name: "title",
                                type: "string",
                            }),
                            defineField({
                                name: "description",
                                type: "text",
                            }),
                        ],
                    }),
                ],
            }),
            defineField({
                name: "cta",
                type: "cta",
            }),
        ]
    }),
    defineField({
        name: "about",
        type: "object",
        group: "about",
        fields: [
            defineField({
                name: "title",
                type: "string",
            }),
            defineField({
                name: "description",
                type: "text",
            }),
            defineField({
                name: "image",
                type: "image",
            }),
            defineField({
                name: "cta",
                type: "cta",
            }),
        ],
    }),
    defineField({
        name: "testimonials",
        type: "object",
        group: "testimonials",
        fields: [
            defineField({
                name: "title",
                type: "string",
            }),
            defineField({
                name: "testimonials",
                type: "array",
                of: [
                    defineArrayMember({
                        type: "object",
                        fields: [
                            defineField({
                                name: "image",
                                type: "image",
                            }),
                            defineField({
                                name: "name",
                                type: "string",
                            }),
                            defineField({
                                name: "testimonial",
                                type: "text",
                            }),
                        ],
                    }),
                ],
            }),
            defineField({
                name: "cta",
                type: "cta",
            }),
        ],
    }),
  ],
})