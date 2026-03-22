import { defineField, defineType } from 'sanity'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'course' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'xp',
      title: 'XP Reward',
      type: 'number',
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (e.g. "12 min")',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (legacy)',
      type: 'url',
      description: 'YouTube or Vimeo URL (use Mux Playback ID instead)',
    }),
    defineField({
      name: 'muxPlaybackId',
      title: 'Mux Playback ID',
      type: 'string',
      description: 'Mux video playback ID for streaming',
    }),
    defineField({
      name: 'content',
      title: 'Lesson Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        {
          type: 'code',
          title: 'Code Block',
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'course.title', order: 'order' },
    prepare({ title, subtitle, order }) {
      return { title: `${order}. ${title}`, subtitle }
    },
  },
})
