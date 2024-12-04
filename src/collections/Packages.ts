import { allowAdmin, allowAnonymous } from '@/utils/access-utils'
import { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'packages',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'expirationDate',
      type: 'date',
      required: true,
      access: {
        update: allowAdmin,
      },
    },
  ],
  access: {
    create: allowAnonymous,
    read: allowAnonymous,
  },
  hooks: {
    beforeOperation: [
      ({ args, req, operation }) => {
        // Only modify read operations
        if (operation !== 'read') return args

        // Expiration date filtering logic
        if (req.body?.where?.expirationDate) {
          const expirationDateFilter = req.body.where.expirationDate
          const parsedFilter: Record<string, Date> = {}

          // Map GraphQL operators to MongoDB query operators
          const operatorMap = {
            greater_than: '$gt',
            greater_than_equal: '$gte',
            less_than: '$lt',
            less_than_equal: '$lte',
            equals: '$eq',
          }

          Object.entries(operatorMap).forEach(([gqlOp, mongoOp]) => {
            if (expirationDateFilter[gqlOp]) {
              try {
                parsedFilter[mongoOp] = new Date(expirationDateFilter[gqlOp])
              } catch (error) {
                throw new Error(`Invalid date format for ${gqlOp}: ${expirationDateFilter[gqlOp]}`)
              }
            }
          })

          req.body.where.expirationDate = parsedFilter
        }

        return args
      },
    ],
  },
}
