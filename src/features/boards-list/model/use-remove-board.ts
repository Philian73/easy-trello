import { type BoardPartial, useBoards } from '@/entities/board'
import { useGetConfirmation } from '@/shared/lib/confirmation'

import { useBoardsListDeps } from '../deps'

export const useRemoveBoard = () => {
  const getConfirmation = useGetConfirmation()
  const { canRemoveBoard } = useBoardsListDeps()

  const removeBoard = useBoards(state => state.removeBoard)

  return async (board: BoardPartial) => {
    const confirmation = await getConfirmation({
      description: 'Вы действительно хотите удалить доску?',
    })

    if (!confirmation || !canRemoveBoard(board)) {
      throw new Error('У вас нет прав для удаления этой доски.')
    }

    await removeBoard(board.id)
  }
}
