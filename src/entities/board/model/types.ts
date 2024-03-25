export type BoardPartial = {
  editorIds: string[]
  id: string
  ownerId: string
  title: string
}

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
