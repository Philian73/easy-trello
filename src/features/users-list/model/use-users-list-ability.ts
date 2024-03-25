import { sessionQuery } from '@/entities/session'
import { type Ability, createModuleAbility } from '@/shared/lib/ability'
import { defineAbility, subject } from '@casl/ability'
import { useSuspenseQuery } from '@tanstack/react-query'

type Abilities = ['create' | 'delete' | 'read', 'User' | { id: string }]

export const getUserSubject = (id: string) => subject('User', { id })

export const useUsersListAbility = createModuleAbility({
  abilityFactory: session => {
    return defineAbility<Ability<Abilities>>(can => {
      if (!session) {
        return
      }

      can('read', 'User')

      if (session.role === 'admin') {
        can('create', 'User')
        can('delete', 'User', {
          id: { $ne: session.userId },
        })
      }
    })
  },
  useData: () => useSuspenseQuery(sessionQuery)?.data,
})
