export type Task = {
  authorId: string
  boardId?: string
  description?: string
  id: string
  title: string
}

export type CreateTaskData = {
  title: string
}

export type UpdateTaskData = {
  boardId?: string
  description?: string
  title?: string
}
