import type { BoardPartial } from './model/types'

import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'

type BoardsListDeps = {
  canCreateBoard: () => boolean
  canRemoveBoard: (board: BoardPartial) => boolean
  canUpdateBoard: (board: BoardPartial) => boolean
  canViewBoard: (board: BoardPartial) => boolean
}

export const boardsListDepsContext = createStrictContext<BoardsListDeps>()

export const useBoardsListDeps = () => useStrictContext(boardsListDepsContext)
