import { useBoards } from '@/entities/board'
import { useSession } from '@/entities/session'
import { useTasks } from '@/entities/task'
import { useGetConfirmation } from '@/shared/lib/confirmation'

import { useCanRemoveBoardFn } from './use-can-remove-board'

export const useRemoveBoard = () => {
  const session = useSession(state => state.currentSession)
  const getConfirmation = useGetConfirmation()
  const canRemoveFn = useCanRemoveBoardFn()

  const removeBoardFromTasks = useTasks(state => state.removeBoardFromTasks)
  const removeBoard = useBoards(state => state.removeBoard)

  return async (boardId: string) => {
    const confirmation = await getConfirmation({
      description: 'Вы действительно хотите удалить доску?',
    })

    if (session?.userId) {
      await removeBoardFromTasks(session.userId, boardId)
    }

    if (canRemoveFn(boardId) && confirmation) {
      await removeBoard(boardId)
    }
  }
}
