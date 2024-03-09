import { useTasks } from '@/entities/task'
import { useGetConfirmation } from '@/shared/lib/confirmation'

export const useRemoveTask = () => {
  const getConfirmation = useGetConfirmation()
  const removeTask = useTasks(state => state.removeTask)

  return async (taskId: string) => {
    const confirmation = await getConfirmation({
      description: 'Вы действительно хотите удалить задачу?',
    })

    if (!confirmation) {
      return
    }

    await removeTask(taskId)
  }
}
