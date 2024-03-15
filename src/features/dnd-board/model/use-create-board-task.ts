import type { CreateBoardTaskData } from '@/entities/board'

import { useSession } from '@/entities/session'

import { useBoardDeps } from '../deps'
import { useBoardStore } from './use-board-store'

export const useCreateBoardTask = () => {
  const userId = useSession(state => state.currentSession?.userId)
  const board = useBoardStore().useSelector(state => state.board)

  const createBoardTaskRaw = useBoardStore().useSelector(state => state.createBoardTask)
  const { canCreateBoardTask } = useBoardDeps()

  const createBoardTask = async (cardId: string, data: CreateBoardTaskData) => {
    if (!canCreateBoardTask(board) || !userId) {
      throw new Error('У вас нет прав для создания задачи в этой доске.')
    }

    await createBoardTaskRaw(userId, cardId, data)
  }

  return { createBoardTask }
}
