import { useBoards } from '@/entities/board'
import { useSession } from '@/entities/session'
import { useUsers } from '@/entities/user'
import { useGetConfirmation } from '@/shared/lib/confirmation'

export const useRemoveUser = () => {
  const getConfirmation = useGetConfirmation()
  const { currentSession, removeSession } = useSession()
  const { boards, removeBoard, updateBoard } = useBoards()

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

    for await (const board of boards) {
      const newBoard = {
        ...board,
        editorsIds: board.editorsIds.filter(id => id !== userId),
      }

      if (newBoard.ownerId === userId) {
        await removeBoard(newBoard.id)
      } else {
        await updateBoard(newBoard.id, newBoard)
      }
    }

    await removeUser(userId)
  }
}
