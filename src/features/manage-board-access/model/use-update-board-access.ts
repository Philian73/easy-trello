import type { UpdateBoardAccessData } from './types'

import { toast } from 'react-toastify'

import { useUpdateBoardMutation } from '@/entities/board'
import { sessionQuery } from '@/entities/session'
import { useGetConfirmation } from '@/shared/lib/confirmation'
import { handleErrorResponse } from '@/shared/lib/utils'
import { useSuspenseQuery } from '@tanstack/react-query'

export const useUpdateBoardAccess = (boardId: string, onUpdate: () => void) => {
  const { data: session } = useSuspenseQuery(sessionQuery)
  const { mutateAsync: updateBoardRaw } = useUpdateBoardMutation()

  const getConfirmation = useGetConfirmation()

  const updateBoard = async (data: UpdateBoardAccessData) => {
    if (session?.userId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description: 'Вы действительно хотите передать доску другому пользователю?',
      })

      if (!confirmation) {
        return null
      }
    }

    try {
      await updateBoardRaw({ id: boardId, ...data })
      onUpdate()
      toast.success('Права доски изменены.')
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  }

  return { updateBoard }
}
