export type BoardPartial = {
  editorsIds: string[]
  id: string
  ownerId: string
  title: string
}

export type Board = {
  cols: BoardCol[]
  editorsIds: string[]
  id: string
  ownerId: string
  title: string
}

export type BoardCol = {
  id: string
  items: BoardCard[]
  title: string
}

export type BoardCard = {
  assigneeId?: string
  id: string
  title: string
}

export type CreateBoardData = {
  editorsIds: string[]
  title: string
}

export type UpdateBoardData = {
  editorsIds?: string[]
  ownerId?: string
  title?: string
}
