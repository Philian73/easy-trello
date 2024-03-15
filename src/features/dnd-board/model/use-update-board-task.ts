import type { UpdateBoardTaskData } from '@/entities/board'
import type { User } from '@/entities/user'

import { useBoardDeps } from '../deps'
import { useBoardStore } from './use-board-store'

export const useUpdateBoardTask = () => {
  const board = useBoardStore().useSelector(state => state.board)

  const { canUpdateBoardTask } = useBoardDeps()

  const updateBoardTaskRaw = useBoardStore().useSelector(state => state.updateBoardTask)

  const updateBoardTask = async (
    cardId: string,
    taskId: string,
    data: UpdateBoardTaskData,
    onUpdate: () => void
  ) => {
    if (!board || !canUpdateBoardTask(board)) {
      throw new Error('У вас нет прав для редактирования этой задачи.')
    }

    await updateBoardTaskRaw(cardId, taskId, data)
    onUpdate()
  }

  const canAssigneeUserToTask = (user: User) =>
    board.ownerId === user.id || board.editorsIds.includes(user.id)

  return { canAssigneeUserToTask, updateBoardTask }
}
