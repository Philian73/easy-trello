import type { UpdateBoardTaskData } from './types'

import { useCallback } from 'react'
import { toast } from 'react-toastify'

import { handleErrorResponse } from '@/shared/lib/utils'

import { useBoardStore } from './use-board-store'

export const useUpdateBoardTask = (cardId: string, taskId: string, onUpdate: () => void) => {
  const boardStore = useBoardStore()
  const board = boardStore.useSelector(state => state.board)
  const updateBoardTaskRaw = boardStore.useSelector(state => state.updateBoardTask)

  const canAssigneeUserToTask = useCallback(
    (user: { id: string }) => board.ownerId === user.id || board.editorIds.includes(user.id),
    [board.editorIds, board.ownerId]
  )

  const updateBoardTask = async (data: UpdateBoardTaskData) => {
    try {
      await updateBoardTaskRaw(cardId, taskId, data)
      onUpdate()
      toast.success('Задача успешно обновлена.')
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  }

  return { canAssigneeUserToTask, updateBoardTask }
}
