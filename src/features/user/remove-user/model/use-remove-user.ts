import { useBoards } from '@/entities/board'
import { useSession } from '@/entities/session'
import { useTasks } from '@/entities/task'
import { useUsers } from '@/entities/user'
import { useGetConfirmation } from '@/shared/lib/confirmation'

export const useRemoveUser = () => {
  const { currentSession, removeSession } = useSession()

  const getConfirmation = useGetConfirmation()

  const removeAuthorFromBoards = useBoards(state => state.removeAuthorFromBoards)

  const removeUserTasks = useTasks(state => state.removeUserTasks)

  const removeUser = useUsers(state => state.removeUser)

  return async (userId: string) => {
    const confirmation = await getConfirmation({
      description: 'Вы действительно хотите удалить пользователя?',
    })

    if (!confirmation) {
      return
    }

    if (currentSession?.userId === userId) {
      await removeSession()
    }

    await removeAuthorFromBoards(userId)
    await removeUserTasks(userId)
    await removeUser(userId)
  }
}
