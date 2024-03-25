import type { User } from '@/entities/user'

export type CreateUserFormData = Pick<User, 'avatarId' | 'email' | 'name' | 'role'> & {
  password: string
}
