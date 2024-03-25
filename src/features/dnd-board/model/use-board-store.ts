import type { StoreApi, UseBoundStore } from 'zustand'

import { useState } from 'react'

import { type Board, useUpdateBoardMutation } from '@/entities/board'
import { sessionQuery } from '@/entities/session'
import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'
import { useSuspenseQuery } from '@tanstack/react-query'

import { type BoardStore, createBoardStore } from './board-store'

export const boardStoreContext = createStrictContext<UseBoundStore<StoreApi<BoardStore>>>()

export const useBoardStore = () => ({ useSelector: useStrictContext(boardStoreContext) })

export const useBoardStoreFactory = (board: Board) => {
  const { mutateAsync: updateBoard } = useUpdateBoardMutation()
  const { data: session } = useSuspenseQuery(sessionQuery)
  const [boardStore] = useState(() => createBoardStore({ board, session, updateBoard }))

  return { boardStore }
}
