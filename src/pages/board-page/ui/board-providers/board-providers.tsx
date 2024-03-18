import type { Board } from '@/entities/board'

import type { FC, PropsWithChildren } from 'react'

import { boardStoreContext, useBoardStoreFactory } from '@/features/dnd-board'
import { manageBoardAccessDepsContext } from '@/features/manage-board-access'

type BoardStoreProviderProps = {
  board: Board
} & PropsWithChildren

export const BoardStoreProvider: FC<BoardStoreProviderProps> = ({ board, children }) => {
  const { boardStore } = useBoardStoreFactory(board)

  return <boardStoreContext.Provider value={boardStore}>{children}</boardStoreContext.Provider>
}

export const BoardDepsProvider: FC<{ board: Board } & PropsWithChildren> = ({
  board,
  children,
}) => {
  return (
    <manageBoardAccessDepsContext.Provider
      value={{
        boardAccessInfo: { editorsIds: board.editorsIds, id: board.id, ownerId: board.ownerId },
      }}
    >
      {children}
    </manageBoardAccessDepsContext.Provider>
  )
}
