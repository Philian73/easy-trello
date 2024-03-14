import { type CreateBoardData, useBoards } from '@/entities/board'
import { useSession } from '@/entities/session'

import { useBoardsListDeps } from '../deps'

export const useCreateBoard = () => {
  const ownerId = useSession(state => state.currentSession?.userId)
  const createBoardRaw = useBoards(state => state.createBoard)
  const { canCreateBoard } = useBoardsListDeps()

  const createBoard = async (data: CreateBoardData, onCreate: () => void) => {
    if (!canCreateBoard || !ownerId) {
      return
    }

    await createBoardRaw(ownerId, data)

    onCreate()
  }

  return { createBoard }
}
