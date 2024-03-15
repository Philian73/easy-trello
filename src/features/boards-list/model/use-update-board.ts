import { type BoardPartial, type UpdateBoardData, useBoards } from '@/entities/board'
import { useSession } from '@/entities/session'
import { useGetConfirmation } from '@/shared/lib/confirmation'

import { useBoardsListDeps } from '../deps'

export const useUpdateBoard = (board?: BoardPartial) => {
  const getConfirmation = useGetConfirmation()

  const { canUpdateBoard } = useBoardsListDeps()

  const ownerId = useSession(state => state.currentSession?.userId)

  const updateModalRaw = useBoards(state => state.updateBoard)

  const updateBoard = async (data: UpdateBoardData, onUpdate: () => void) => {
    if (!board || !canUpdateBoard(board)) {
      throw new Error('У вас нет прав для редактирования этой доски.')
    }

    if (ownerId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description: 'Вы действительно хотите передать доску другому пользователю?',
      })

      if (!confirmation) {
        return
      }
    }

    await updateModalRaw(board.id, data)
    onUpdate()
  }

  return { updateBoard }
}
