import { Access, FieldAccess, PayloadRequest } from 'payload'

export const anonymous = () => true

export const onlyActualUser: Access = ({ req, id }) => req.user?.id === id

export const onlyAdmin: Access & FieldAccess = ({ req }: { req: PayloadRequest }) =>
  req.user?.role === 'admin'

export const onlyAdminOrActualUser: Access = (...args) =>
  onlyAdmin(...args) || onlyActualUser(...args)
