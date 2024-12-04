import { Access, FieldAccess, PayloadRequest } from 'payload'

export const allowAnyone = () => true

export const allowActualUser: Access = ({ req, id }) => req.user?.id === id

export const allowAdmin: Access & FieldAccess = ({ req }: { req: PayloadRequest }) =>
  req.user?.role === 'admin'

export const allowAdminOrActualUser: Access = (...args) =>
  allowAdmin(...args) || allowActualUser(...args)
