import { type BoardPartial, useBoards } from '@/entities/board'
import { type Session, useSession } from '@/entities/session'

const canViewBoard = (board?: BoardPartial, session?: Session) => {
  if (!board) {
    return false
  }

  return (
    session && (board?.editorsIds.includes(session.userId) || board.ownerId === session?.userId)
  )
}

export const useCanViewBoardFn = () => {
  const session = useSession(state => state.currentSession)
  const getBoardById = useBoards(state => state.getBoardById)

  return (boardId: string) => {
    const board = getBoardById(boardId)

    return canViewBoard(board, session)
  }
}
