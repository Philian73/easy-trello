import { useSession } from '@/entities/session'
import { type CreateTaskData, useTasks } from '@/entities/task'

import { useCanCreateTask } from './use-can-create-task'

export const useCreateTask = () => {
  const session = useSession(state => state.currentSession)
  const canCreate = useCanCreateTask()
  const createTaskRaw = useTasks(state => state.createTask)

  const createTask = async (data: CreateTaskData) => {
    if (!canCreate || !session?.userId) {
      return
    }

    await createTaskRaw(data, session.userId)
  }

  return { createTask }
}
