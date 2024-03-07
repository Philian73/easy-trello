import { type CreateBoardData, useBoards } from '@/entities/board'
import { useSession } from '@/entities/session'

import { useCanCreateBoard } from './use-can-create-board'

export const useCreateBoard = () => {
  const session = useSession(state => state.currentSession)
  const canCreate = useCanCreateBoard()
  const createBoardRaw = useBoards(state => state.createBoard)

  const createBoard = async (data: CreateBoardData, onCreate: () => void) => {
    if (!canCreate || !session?.userId) {
      return
    }

    await createBoardRaw({ ...data, ownerId: session.userId })

    onCreate()
  }

  return { createBoard }
}
