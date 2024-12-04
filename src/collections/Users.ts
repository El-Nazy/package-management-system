import { allowAdmin, allowAdminOrActualUser, allowAnyone } from '../utils/access-utils'
import type { CollectionConfig, FieldAccess } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: allowAnyone,
    read: allowAnyone,
    update: allowAdminOrActualUser,
    delete: allowAdminOrActualUser,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      options: ['user', 'admin'],
      defaultValue: 'user',
      access: {
        update: allowAdmin,
      },
    },
  ],
}
