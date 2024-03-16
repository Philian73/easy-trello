import { toast } from 'react-toastify'

import { useGetConfirmation } from '@/shared/lib/confirmation'
import { handleErrorResponse } from '@/shared/lib/utils'

import { useBoardStore } from './use-board-store'

export const useRemoveBoardTask = (cardId: string, taskId: string) => {
  const getConfirmation = useGetConfirmation()
  const removeBoardTaskRaw = useBoardStore().useSelector(state => state.removeBoardTask)

  const removeBoardTask = async () => {
    const confirmation = await getConfirmation({
      description: 'Вы уверены, что хотите удалить эту задачу?',
      title: 'Удаление задачи',
    })

    if (!confirmation) {
      return
    }

    try {
      await removeBoardTaskRaw(cardId, taskId)
      toast.success('Задача успешно удалена.')
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  }

  return { removeBoardTask }
}
