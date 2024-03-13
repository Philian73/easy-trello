export type Task = {
  assigneeId?: string
  authorId: string
  description?: string
  id: string
  title: string
}

export type CreateTaskData = {
  title: string
}

export type UpdateTaskData = {
  assigneeId?: string
  description?: string
  title?: string
}
