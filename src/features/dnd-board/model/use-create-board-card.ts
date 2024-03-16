import type { CreateBoardCardData } from '@/entities/board'

import { useBoardDeps } from '../deps'
import { useBoardStore } from '../model/use-board-store'

export const useCreateBoardCard = () => {
  const board = useBoardStore().useSelector(state => state.board)

  const createBoardCardRaw = useBoardStore().useSelector(state => state.createBoardCard)

  const { canCreateBoardCard } = useBoardDeps()

  const createBoardCard = async (data: CreateBoardCardData, onCreate: () => void) => {
    if (!canCreateBoardCard(board)) {
      throw new Error('У вас нет прав для создания карточки в этой доске.')
    }

    await createBoardCardRaw(data)

    onCreate()
  }

  return { createBoardCard }
}
