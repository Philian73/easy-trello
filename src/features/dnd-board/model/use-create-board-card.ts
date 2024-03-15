import type { CreateBoardCardData } from '@/entities/board'

import { useSession } from '@/entities/session'

import { useBoardDeps } from '../deps'
import { useBoardStore } from '../model/use-board-store'

export const useCreateBoardCard = () => {
  const userId = useSession(state => state.currentSession?.userId)
  const board = useBoardStore().useSelector(state => state.board)

  const createBoardCardRaw = useBoardStore().useSelector(state => state.createBoardCard)

  const { canCreateBoardCard } = useBoardDeps()

  const createBoardCard = async (data: CreateBoardCardData, onCreate: () => void) => {
    if (!canCreateBoardCard(board) || !userId) {
      throw new Error('У вас нет прав для создания карточки в этой доске.')
    }

    await createBoardCardRaw(userId, data)

    onCreate()
  }

  return { createBoardCard }
}
