export type UserRole = 'admin' | 'user'

export type User = {
  avatarId: string
  created: string
  email: string
  id: string
  name: string
  role: UserRole
  updated: string
}

export type CreateUserFormData = Pick<User, 'avatarId' | 'email' | 'name' | 'role'> & {
  password: string
}
