export type Board = {
  authorId: string
  cards: BoardCard[]
  created: string
  editorsIds: string[]
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

export type BoardPartial = Omit<Board, 'authorId' | 'cards' | 'created' | 'updated'>

export type CreateBoardData = Pick<Board, 'editorsIds' | 'title'>

export type UpdateBoardData = Partial<Pick<Board, 'editorsIds' | 'ownerId' | 'title'>>

export type CreateBoardCardData = Pick<BoardCard, 'title'>

export type UpdateBoardCardData = Pick<BoardCard, 'title'>

export type CreateBoardTaskData = Pick<BoardTask, 'title'>

export type UpdateBoardTaskData = Partial<Pick<BoardTask, 'assigneeId' | 'description' | 'title'>>
