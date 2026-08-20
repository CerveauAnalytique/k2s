import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { link } from '@/fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      defaultValue: 'Prysel',
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      defaultValue: 'Search docs, research, products…',
    },
    {
      name: 'loginLabel',
      type: 'text',
      defaultValue: 'Log in',
    },
    {
      name: 'loginURL',
      type: 'text',
      defaultValue: '/login',
    },
    {
      name: 'startLabel',
      type: 'text',
      defaultValue: 'Get started',
    },
    {
      name: 'startURL',
      type: 'text',
      defaultValue: '/create-account',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 10,
    },
  ],
}
