import type { FC, PropsWithChildren } from 'react'

import { subjectDefault, useAbility } from '@/features/auth'
import { type BoardPartial, boardsListDepsContext } from '@/features/boards-list'
import { ComposeChildren } from '@/shared/lib/compose-children'

const subject = subjectDefault<'Board', BoardPartial>

export const BoardsListProviders: FC<PropsWithChildren> = ({ children }) => {
  const ability = useAbility()

  return (
    <ComposeChildren>
      <boardsListDepsContext.Provider
        value={{
          canCreateBoard: () => ability.can('create', 'Board'),
          canRemoveBoard: board => ability.can('delete', subject('Board', board)),
          canUpdateBoard: board => ability.can('update', subject('Board', board)),
          canViewBoard: board => ability.can('read', subject('Board', board)),
        }}
      />

      {children}
    </ComposeChildren>
  )
}
