import type { BoardPartial } from '@/entities/board'

export type CreateBoardFormData = Pick<BoardPartial, 'editorIds' | 'title'>

export type UpdateBoardFormData = Partial<Pick<BoardPartial, 'editorIds' | 'ownerId' | 'title'>>
