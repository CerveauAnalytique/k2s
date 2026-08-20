import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: ({ req: { user } }) => {
      // Authenticated admins/users can read everything in admin; public only published.
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    update: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'blogId', 'category', 'slug', 'publishedAt', '_status'],
    group: 'Content',
  },
  versions: {
    drafts: {
      autosave: false,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'blogId',
      type: 'text',
      label: 'Blog ID',
      admin: {
        description: 'Unique custom Blog ID (e.g. BLOG-101)',
      },
    },
    slugField({
      position: undefined,
    }),
    {
      name: 'category',
      type: 'select',
      defaultValue: 'Stories',
      options: [
        { label: 'Explore More', value: 'Explore' },
        { label: 'Stories', value: 'Stories' },
        { label: 'Business & Enterprise', value: 'Business' },
        { label: 'Developers', value: 'Developers' },
        { label: 'Research & AI', value: 'Research' },
      ],
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'coverImageUrl',
      type: 'text',
      label: 'Cover Image URL (Fallback)',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt / Summary',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Full Article Content',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
