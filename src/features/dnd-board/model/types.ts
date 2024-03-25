import type { BoardCard } from '@/entities/board'

export type UpdateBoardData = {
  cards?: BoardCard[]
  editorIds?: string[]
  ownerId?: string
  title?: string
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
