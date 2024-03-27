import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useRemoveBoardMutation } from '@/entities/board'
import { useGetConfirmation } from '@/shared/lib/confirmation'
import { handleErrorResponse } from '@/shared/lib/utils'

export const useRemoveBoard = (boardId: string) => {
  const { t } = useTranslation()

  const getConfirmation = useGetConfirmation()

  const { isPending, mutateAsync: removeBoardRaw } = useRemoveBoardMutation()

  const removeBoard = async () => {
    const confirmation = await getConfirmation({
      description: t('pages.boards.remove-board.confirm'),
    })

    if (!confirmation) {
      return null
    }

    removeBoardRaw(boardId)
      .then(() => {
        toast.success(t('pages.boards.remove-board.success-info'))
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  }

  return {
    isPending,
    removeBoard,
  }
}
