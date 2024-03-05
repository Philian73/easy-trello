import { useSession } from '@/entities/session'
import { useUsers } from '@/entities/user'

export const useRemoveUser = () => {
  const { currentSession, removeSession } = useSession()
  const removeUser = useUsers(state => state.removeUser)

  return async (userId: string) => {
    if (currentSession?.userId === userId) {
      await removeSession()
    }

    await removeUser(userId)
  }
}
