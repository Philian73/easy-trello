import type { Board } from '@/entities/board'

export type BoardAccessInfo = Pick<Board, 'id' | 'ownerId'> & {
  editorsIds?: string[]
}

export type UpdateBoardAccessData = Omit<BoardAccessInfo, 'id'>
