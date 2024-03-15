import type { UpdateBoardCardData } from '@/entities/board'

import { useBoardDeps } from '../deps'
import { useBoardStore } from './use-board-store'

export const useUpdateBoardCard = (cardId: string) => {
  const board = useBoardStore().useSelector().board

  const { canUpdateBoardCard } = useBoardDeps()

  const updateBoardCardRaw = useBoardStore().useSelector(state => state.updateBoardCard)

  const updateBoardCard = async (data: UpdateBoardCardData, onUpdate: () => void) => {
    if (!board || !canUpdateBoardCard(board)) {
      throw new Error('У вас нет права для редактирования этой карточки.')
    }

    await updateBoardCardRaw(cardId, data)
    onUpdate()
  }

  return { updateBoardCard }
}
