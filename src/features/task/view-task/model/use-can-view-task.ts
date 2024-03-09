import { type Session, useSession } from '@/entities/session'
import { type Task, useTasks } from '@/entities/task'

const canViewTask = (task?: Task, session?: Session) => {
  if (!task) {
    return false
  }

  return session && task.authorId === session.userId
}

export const useCanViewTaskFn = () => {
  const session = useSession(state => state.currentSession)
  const getTaskById = useTasks(state => state.getTaskById)

  return (taskId: string) => {
    const task = getTaskById(taskId)

    return canViewTask(task, session)
  }
}
