import type { UpdateBoardFormData } from './types'

import { toast } from 'react-toastify'

import { useUpdateBoardMutation } from '@/entities/board'
import { sessionQuery } from '@/entities/session'
import { useGetConfirmation } from '@/shared/lib/confirmation'
import { handleErrorResponse } from '@/shared/lib/utils'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useUpdateBoard = (boardId: string, onUpdate: () => void) => {
  const { data: session } = useSuspenseQuery(sessionQuery)
  const { isPending, mutateAsync: updateModalRaw } = useUpdateBoardMutation()

  const getConfirmation = useGetConfirmation()

  const updateBoard = async (data: UpdateBoardFormData) => {
    if (session?.userId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description: 'Вы действительно хотите передать доску другому пользователю?',
      })

      if (!confirmation) {
        return null
      }
    }

    updateModalRaw({ boardId, patch: data })
      .then(() => {
        onUpdate()
        toast.success('Доска успешно обновлена.')
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  }

  return { isPending, updateBoard }
}
