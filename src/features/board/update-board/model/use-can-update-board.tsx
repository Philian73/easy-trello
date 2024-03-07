import { type BoardPartial, useBoards } from '@/entities/board'
import { type Session, useSession } from '@/entities/session'

export const canUpdateBoard = (board?: BoardPartial, session?: Session) => {
  if (!board) {
    return false
  }

  return session?.userId === board?.ownerId
}

export const useCanUpdateBoardFn = () => {
  const session = useSession(state => state.currentSession)
  const getBoardById = useBoards(state => state.getBoardById)

  return (boardId: string) => {
    const board = getBoardById(boardId)

    return canUpdateBoard(board, session)
  }
}

export const useCanUpdateBoard = (boardId: string) => {
  const board = useBoards(state => state.getBoardById(boardId))
  const session = useSession(state => state.currentSession)

  return canUpdateBoard(board, session)
}
