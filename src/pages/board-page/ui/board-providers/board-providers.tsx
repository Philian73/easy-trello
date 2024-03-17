import type { Board } from '@/entities/board'

import type { FC, PropsWithChildren } from 'react'

import { boardStoreContext, useBoardStoreFactory } from '@/features/dnd-board'

type BoardStoreProviderProps = {
  board: Board
} & PropsWithChildren

export const BoardStoreProvider: FC<BoardStoreProviderProps> = ({ board, children }) => {
  const { boardStore } = useBoardStoreFactory(board)

  return <boardStoreContext.Provider value={boardStore}>{children}</boardStoreContext.Provider>
}
