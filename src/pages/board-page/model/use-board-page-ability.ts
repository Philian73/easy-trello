import { sessionQuery } from '@/entities/session'
import { type Ability, createModuleAbility } from '@/shared/lib/ability'
import { defineAbility, subject } from '@casl/ability'
import { useSuspenseQuery } from '@tanstack/react-query'

type Abilities = ['update-access', 'Board' | { ownerId: string }]

export const getBoardPageSubject = (ownerId: string) => subject('Board', { ownerId })

export const useBoardPageAbility = createModuleAbility({
  abilityFactory: session => {
    return defineAbility<Ability<Abilities>>(can => {
      if (!session) {
        return
      }

      const userId = session.userId

      can('update-access', 'Board', {
        ownerId: userId,
      })
    })
  },
  useData: () => useSuspenseQuery(sessionQuery)?.data,
})
