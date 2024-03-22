export type BoardAccessInfo = {
  editorIds?: string[]
  id: string
  ownerId: string
}

export type UpdateBoardAccessData = Omit<BoardAccessInfo, 'id'>
