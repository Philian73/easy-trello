export type UserRole = 'admin' | 'user'

export type User = {
  avatarId: string
  email: string
  id: string
  name: string
  role: UserRole
}
