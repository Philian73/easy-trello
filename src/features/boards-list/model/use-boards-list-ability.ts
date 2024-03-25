import { sessionQuery } from '@/entities/session'
import { type Ability, createModuleAbility } from '@/shared/lib/ability'
import { defineAbility, subject } from '@casl/ability'
import { useSuspenseQuery } from '@tanstack/react-query'

type Abilities = ['delete' | 'update', 'Board' | { editorIds: string[]; ownerId: string }]

export const getBoardsListsSubject = (perms: { editorIds: string[]; ownerId: string }) =>
  subject('Board', perms)

export const useBoardsListAbility = createModuleAbility({
  abilityFactory: session => {
    return defineAbility<Ability<Abilities>>(can => {
      if (!session) {
        return
      }
      const userId = session.userId

      can(['delete', 'update'], 'Board', {
        ownerId: userId,
      })
    })
  },
  useData: () => useSuspenseQuery(sessionQuery)?.data,
})
