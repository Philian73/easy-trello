import type { CreateBoardTaskData } from '@/entities/board'

import { useBoardDeps } from '../deps'
import { useBoardStore } from './use-board-store'

export const useCreateBoardTask = () => {
  const board = useBoardStore().useSelector(state => state.board)

  const createBoardTaskRaw = useBoardStore().useSelector(state => state.createBoardTask)
  const { canCreateBoardTask } = useBoardDeps()

  const createBoardTask = async (cardId: string, data: CreateBoardTaskData) => {
    if (!canCreateBoardTask(board)) {
      throw new Error('У вас нет прав для создания задачи в этой доске.')
    }

    await createBoardTaskRaw(cardId, data)
  }

  return { createBoardTask }
}
