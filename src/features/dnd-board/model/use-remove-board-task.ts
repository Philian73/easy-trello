import { useGetConfirmation } from '@/shared/lib/confirmation'

import { useBoardDeps } from '../deps'
import { useBoardStore } from './use-board-store'

export const useRemoveBoardTask = () => {
  const board = useBoardStore().useSelector(state => state.board)

  const getConfirmation = useGetConfirmation()
  const { canRemoveBoardTask } = useBoardDeps()

  const removeBoardTaskRaw = useBoardStore().useSelector(state => state.removeBoardTask)

  const removeBoardTask = async (cardId: string, taskId: string) => {
    const confirmation = await getConfirmation({
      description: 'Вы уверены, что хотите удалить эту задачу?',
      title: 'Удаление задачи',
    })

    if (!confirmation) {
      return null
    }

    if (!canRemoveBoardTask(board)) {
      throw new Error('У вас нет прав для удаления этой задачи.')
    }

    await removeBoardTaskRaw(cardId, taskId)
  }

  return { removeBoardTask }
}
