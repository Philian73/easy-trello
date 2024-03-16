import type { Board, BoardPartialSubject } from '@/entities/board'

import type { FC, PropsWithChildren } from 'react'

import { subjectDefault, useAbility } from '@/features/auth'
import { boardDepsContext, boardStoreContext, useBoardStoreFactory } from '@/features/dnd-board'

const subjectCard = subjectDefault<'BoardCard', BoardPartialSubject>
const subjectTask = subjectDefault<'BoardTask', BoardPartialSubject>

export const BoardDepsProvider: FC<PropsWithChildren> = ({ children }) => {
  const ability = useAbility()

  return (
    <boardDepsContext.Provider
      value={{
        canCreateBoardCard(board) {
          return ability.can(
            'create',
            subjectCard('BoardCard', {
              editorsIds: board.editorsIds,
              ownerId: board.ownerId,
            })
          )
        },
        canCreateBoardTask(board) {
          return ability.can(
            'create',
            subjectTask('BoardTask', { editorsIds: board.editorsIds, ownerId: board.ownerId })
          )
        },
        canRemoveBoardTask(board) {
          return ability.can(
            'delete',
            subjectTask('BoardTask', { editorsIds: board.editorsIds, ownerId: board.ownerId })
          )
        },
        canUpdateBoardCard(board) {
          return ability.can(
            'update',
            subjectCard('BoardCard', { editorsIds: board.editorsIds, ownerId: board.ownerId })
          )
        },
        canUpdateBoardTask(board) {
          return ability.can(
            'update',
            subjectTask('BoardTask', { editorsIds: board.editorsIds, ownerId: board.ownerId })
          )
        },
      }}
    >
      {children}
    </boardDepsContext.Provider>
  )
}

type BoardStoreProviderProps = {
  board: Board
} & PropsWithChildren

export const BoardStoreProvider: FC<BoardStoreProviderProps> = ({ board, children }) => {
  const { boardStore } = useBoardStoreFactory(board)

  return <boardStoreContext.Provider value={boardStore}>{children}</boardStoreContext.Provider>
}
