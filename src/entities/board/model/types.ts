export type BoardPartial = {
  editorsIds: string[]
  id: string
  name: string
  ownerId: string
}

export type Board = {
  cols: BoardCol[]
  editorsIds: string[]
  id: string
  name: string
  ownerId: string
}

export type BoardCol = {
  id: string
  items: BoardItem[]
  name: string
}

export type BoardItem = {
  author: BoardAuthor
  description: string
  id: string
  name: string
}

export type BoardAuthor = {
  avatarId: string
  id: string
  name: string
}

export type CreateBoardData = {
  editorsIds: string[]
  name: string
  ownerId: string
}

export type UpdateBoardData = {
  editorsIds?: string[]
  name?: string
  ownerId?: string
}
