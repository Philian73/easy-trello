/* eslint-disable-next-line boundaries/element-types, boundaries/entry-point */
import type { UserRole } from '@/entities/user/@x/session'

export type Session = {
  avatarId: string
  email: string
  id: string
  name: string
  role: UserRole
  userId: string
}
