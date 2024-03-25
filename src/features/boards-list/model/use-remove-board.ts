import { toast } from 'react-toastify'

import { useRemoveBoardMutation } from '@/entities/board'
import { useGetConfirmation } from '@/shared/lib/confirmation'
import { handleErrorResponse } from '@/shared/lib/utils'

export const useRemoveBoard = (boardId: string) => {
  const getConfirmation = useGetConfirmation()

  const { isPending, mutateAsync: removeBoardRaw } = useRemoveBoardMutation()

  const removeBoard = async () => {
    const confirmation = await getConfirmation({
      description: 'Вы действительно хотите удалить доску?',
    })

    if (!confirmation) {
      return null
    }

    await removeBoardRaw(boardId, {
      onError: error => {
        handleErrorResponse(error, toast.error)
      },
      onSuccess: () => {
        toast.success('Доска успешно удалена.')
      },
    })
  }

  return {
    isPending,
    removeBoard,
  }
}
