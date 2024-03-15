import type { BoardPartialSubject } from '@/entities/board'

import type { FC, PropsWithChildren } from 'react'

import { subjectDefault, useAbility } from '@/features/auth'
import { boardsListDepsContext } from '@/features/boards-list'

const subject = subjectDefault<'Board', BoardPartialSubject>

export const BoardsListProvider: FC<PropsWithChildren> = ({ children }) => {
  const ability = useAbility()

  return (
    <boardsListDepsContext.Provider
      value={{
        canCreateBoard: () => ability.can('create', 'Board'),
        canRemoveBoard: board =>
          ability.can(
            'delete',
            subject('Board', { editorsIds: board.editorsIds, ownerId: board.ownerId })
          ),
        canUpdateBoard: board =>
          ability.can(
            'update',
            subject('Board', { editorsIds: board.editorsIds, ownerId: board.ownerId })
          ),
        canViewBoard: board =>
          ability.can(
            'read',
            subject('Board', { editorsIds: board.editorsIds, ownerId: board.ownerId })
          ),
      }}
    >
      {children}
    </boardsListDepsContext.Provider>
  )
}
