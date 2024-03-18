import type { StoreApi, UseBoundStore } from 'zustand'

import { useCallback, useEffect, useState } from 'react'

import { type Board, boardsRepository } from '@/entities/board'
import { useSession } from '@/entities/session'
import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'

import { type BoardStore, createBoardStore } from './board-store'

export const boardStoreContext = createStrictContext<UseBoundStore<StoreApi<BoardStore>>>()

export const useBoardStore = () => ({ useSelector: useStrictContext(boardStoreContext) })

export const useFetchBoard = (boardId?: string) => {
  const [board, setBoard] = useState<Board>()

  const fetchBoard = useCallback(() => {
    if (!boardId) {
      return
    }

    boardsRepository.getBoard(boardId).then(board => {
      if (!board) {
        return
      }

      setBoard(board)
    })
  }, [boardId])

  useEffect(() => {
    fetchBoard()
  }, [fetchBoard])

  return { board, fetchBoard }
}

export const useBoardStoreFactory = (board: Board) => {
  const session = useSession(state => state.currentSession)
  const [boardStore] = useState(() => createBoardStore({ board, session }))

  return { boardStore }
}
