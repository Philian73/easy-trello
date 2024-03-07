import { type UpdateBoardData, useBoards } from '@/entities/board'
import { useSession } from '@/entities/session'
import { useGetConfirmation } from '@/shared/lib/confirmation'

import { useCanUpdateBoardFn } from './use-can-update-board'

export const useUpdateBoard = (boardId: string) => {
  const session = useSession(state => state.currentSession)
  const getConfirmation = useGetConfirmation()
  const canUpdateFn = useCanUpdateBoardFn()

  const updateModalRaw = useBoards(state => state.updateBoard)

  const updateBoard = async (data: UpdateBoardData, onUpdate: () => void) => {
    if (!canUpdateFn(boardId)) {
      return
    }

    if (session?.userId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description: 'Вы действительно хотите передать доску другому пользователю?',
      })

      if (!confirmation) {
        return
      }
    }

    await updateModalRaw(boardId, data)
    onUpdate()
  }

  return { updateBoard }
}
