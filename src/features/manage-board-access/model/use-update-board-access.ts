import type { UpdateBoardAccessData } from './types'

import { toast } from 'react-toastify'

import { useBoards } from '@/entities/board'
import { useSession } from '@/entities/session'
import { useGetConfirmation } from '@/shared/lib/confirmation'
import { handleErrorResponse } from '@/shared/lib/utils'

export const useUpdateBoardAccess = (boardId: string, onUpdate: () => void) => {
  const getConfirmation = useGetConfirmation()
  const userId = useSession(state => state.currentSession?.userId)
  const updateBoardRaw = useBoards(state => state.updateBoard)

  const updateBoard = async (data: UpdateBoardAccessData) => {
    if (userId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description: 'Вы действительно хотите передать доску другому пользователю?',
      })

      if (!confirmation) {
        return
      }
    }

    try {
      await updateBoardRaw(boardId, data)
      onUpdate()
      toast.success('Права доски изменены.')
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  }

  return { updateBoard }
}
