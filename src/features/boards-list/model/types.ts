export type BoardPartial = {
  editorIds: string[]
  id: string
  ownerId: string
  title: string
}

export type CreateBoardFormData = Pick<BoardPartial, 'editorIds' | 'title'>

export type UpdateBoardFormData = Partial<Pick<BoardPartial, 'editorIds' | 'ownerId' | 'title'>>
