import type { Board } from '@/entities/board'

import type { FC, PropsWithChildren } from 'react'

import { boardStoreContext, useBoardStoreFactory } from '@/features/dnd-board'
import { manageBoardAccessDepsContext } from '@/features/manage-board-access'
import { ComposeChildren } from '@/shared/lib/compose-children'

type BoardProvidersProps = {
  board: Board
} & PropsWithChildren

export const BoardProviders: FC<BoardProvidersProps> = ({ board, children }) => {
  const { boardStore } = useBoardStoreFactory(board)

  return (
    <ComposeChildren>
      <boardStoreContext.Provider value={boardStore} />
      <manageBoardAccessDepsContext.Provider
        value={{
          boardAccessInfo: { editorsIds: board.editorsIds, id: board.id, ownerId: board.ownerId },
        }}
      />
      {children}
    </ComposeChildren>
  )
}
