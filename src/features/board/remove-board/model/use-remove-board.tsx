import { useBoards } from '@/entities/board'
import { useGetConfirmation } from '@/shared/lib/confirmation'

import { useCanRemoveBoardFn } from './use-can-remove-board'

export const useRemoveBoard = () => {
  const getConfirmation = useGetConfirmation()
  const canRemoveFn = useCanRemoveBoardFn()

  const removeBoard = useBoards(state => state.removeBoard)

  return async (boardId: string) => {
    const confirmation = await getConfirmation({
      description: 'Вы действительно хотите удалить доску?',
    })

    if (canRemoveFn(boardId) && confirmation) {
      await removeBoard(boardId)
    }
  }
}
