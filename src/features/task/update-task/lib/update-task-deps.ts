import { createStrictContext } from '@/shared/lib/hooks'

type UpdateTaskDeps = {
  canViewBoard: (boardId: string) => boolean
}

export const updateTaskDepsContext = createStrictContext<UpdateTaskDeps>()
