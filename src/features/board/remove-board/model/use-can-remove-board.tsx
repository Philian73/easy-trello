import { type BoardPartial, useBoards } from '@/entities/board'
import { type Session, useSession } from '@/entities/session'

const canRemoveBoard = (board?: BoardPartial, session?: Session) => {
  if (!board) {
    return false
  }

  return session?.userId === board?.ownerId
}

export const useCanRemoveBoardFn = () => {
  const session = useSession(state => state.currentSession)
  const getBoardById = useBoards(state => state.getBoardById)

  return (boardId: string) => {
    const board = getBoardById(boardId)

    return canRemoveBoard(board, session)
  }
}

export const useCanRemoveBoard = (boardId: string) => {
  const board = useBoards(state => state.getBoardById(boardId))
  const session = useSession(state => state.currentSession)

  return canRemoveBoard(board, session)
}
