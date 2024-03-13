import type { FC, PropsWithChildren } from 'react'

import { subject, useAbility } from '@/features/auth'
import { boardsListDepsContext } from '@/features/boards-list'

export const BoardsListProvider: FC<PropsWithChildren> = ({ children }) => {
  const ability = useAbility()

  return (
    <boardsListDepsContext.Provider
      value={{
        canCreateBoard: () => ability.can('create', 'Board'),
        canRemoveBoard: board => ability.can('delete', subject('Board', board)),
        canUpdateBoard: board => ability.can('update', subject('Board', board)),
        canViewBoard: board => ability.can('read', subject('Board', board)),
      }}
    >
      {children}
    </boardsListDepsContext.Provider>
  )
}
