import type { Board as BoardType } from '@/entities/board'

import { type FC, type PropsWithChildren, useState } from 'react'

import { boardSearchContext, boardStoreContext, useBoardStoreFactory } from '@/features/dnd-board'
import { manageBoardAccessDepsContext } from '@/features/manage-board-access'
import { ComposeChildren } from '@/shared/lib/compose-children'

type BoardProvidersProps = {
  board: BoardType
} & PropsWithChildren

export const BoardProviders: FC<BoardProvidersProps> = ({ board, children }) => {
  const { boardStore } = useBoardStoreFactory(board)

  const queryState = useState('')

  return (
    <ComposeChildren>
      <boardStoreContext.Provider value={boardStore} />
      <manageBoardAccessDepsContext.Provider
        value={{
          boardAccessInfo: { editorIds: board.editorIds, id: board.id, ownerId: board.ownerId },
        }}
      />
      <boardSearchContext.Provider value={queryState} />

      {children}
    </ComposeChildren>
  )
}
