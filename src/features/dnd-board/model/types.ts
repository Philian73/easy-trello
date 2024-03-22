export type Board = {
  authorId: string
  cards: BoardCard[]
  created: string
  editorIds: string[]
  id: string
  ownerId: string
  title: string
  updated: string
}

export type BoardCard = {
  authorId: string
  created: string
  id: string
  tasks: BoardTask[]
  title: string
  updated: string
}

export type BoardTask = {
  assigneeId?: string
  authorId: string
  created: string
  description?: string
  id: string
  title: string
  updated: string
}

export type CreateBoardCardData = {
  title: string
}

export type UpdateBoardCardData = {
  title?: string
}

export type CreateBoardTaskData = {
  title: string
}

export type UpdateBoardTaskData = {
  assigneeId?: string
  description?: string
  title?: string
}
