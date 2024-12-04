import {
  allowAdmin,
  allowAdminOrActualUser as allowAdminOrActualUser,
  allowAnonymous,
} from '../utils/access-utils'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: allowAnonymous,
    read: allowAnonymous,
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
      hooks: {
        beforeChange: [
          async (args) => {
            // Make first user admin
            if (
              args.operation === 'create' &&
              (await args.req.payload.db.collections['users'].estimatedDocumentCount()) === 0
            ) {
              return 'admin'
            }

            if (allowAdmin(args)) {
              return args.value
            }

            return 'user'
          },
        ],
      },
      access: {
        update: allowAdmin,
      },
    },
  ],
}
