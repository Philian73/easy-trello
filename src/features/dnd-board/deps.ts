import type { Board } from '@/entities/board'

import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'

type BoardDeps = {
  canCreateBoardCard: (board: Board) => boolean
  canCreateBoardTask: (board: Board) => boolean
  canRemoveBoardTask: (board: Board) => boolean
  canUpdateBoardCard: (board: Board) => boolean
  canUpdateBoardTask: (board: Board) => boolean
}

export const boardDepsContext = createStrictContext<BoardDeps>()

export const useBoardDeps = () => useStrictContext(boardDepsContext)
