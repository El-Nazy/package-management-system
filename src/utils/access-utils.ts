import { Access, FieldAccess } from 'payload'

export const allowAnonymous = () => true

export const allowNobody = () => false

export const allowActualUser: Access = ({ req, id }) => req.user?.id === id

export const allowAdmin: Access & FieldAccess = ({ req }) => req.user?.role === 'admin'

export const allowAdminOrActualUser: Access = (...args) =>
  allowAdmin(...args) || allowActualUser(...args)
