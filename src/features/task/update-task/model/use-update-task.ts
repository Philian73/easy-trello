import { type UpdateTaskData, useTasks } from '@/entities/task'

export const useUpdateTask = (taskId: string) => {
  const updateModalRaw = useTasks(state => state.updateTask)

  const updateTask = async (data: UpdateTaskData, onUpdate: () => void) => {
    await updateModalRaw(taskId, data)

    onUpdate()
  }

  return { updateTask }
}
