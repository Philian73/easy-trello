import type { UpdateBoardTaskData } from './types'

import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { handleErrorResponse } from '@/shared/lib/utils'

import { useBoardStore } from './use-board-store'

export const useUpdateBoardTask = (cardId: string, taskId: string, onUpdate: () => void) => {
  const { t } = useTranslation()

  const boardStore = useBoardStore()
  const board = boardStore.useSelector(state => state.board)
  const updateBoardTaskRaw = boardStore.useSelector(state => state.updateBoardTask)

  const canAssigneeUserToTask = useCallback(
    (user: { id: string }) => board.ownerId === user.id || board.editorIds.includes(user.id),
    [board.editorIds, board.ownerId]
  )

  const updateBoardTask = (data: UpdateBoardTaskData) => {
    updateBoardTaskRaw(cardId, taskId, data)
      .then(() => {
        onUpdate()
        toast.success(t('pages.board.tasks.update.success-info'))
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  }

  return { canAssigneeUserToTask, updateBoardTask }
}
