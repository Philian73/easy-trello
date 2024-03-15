import { useUsers } from '@/entities/user'

export type CreateUserFormData = {
  avatarId: string
  name: string
}

export const useCreateUser = () => {
  const createUser = useUsers(state => state.createUser)

  return async (data: CreateUserFormData) => {
    await createUser(data)
  }
}
