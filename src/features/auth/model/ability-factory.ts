import type { SessionDto } from '@/shared/api'

import { type MongoAbility, type MongoQuery, defineAbility } from '@casl/ability'

type CRUD = 'create' | 'delete' | 'read' | 'update'
type UpdateAccess = 'update-access'
type Abilities =
  | ['sign-in-as' | 'sign-out', 'User' | { id: string }]
  | [CRUD | UpdateAccess, 'Board' | { editorIds: string[]; ownerId: string }]
type Conditions = MongoQuery

export type Ability = MongoAbility<Abilities, Conditions>

export const abilityFactory = (session: SessionDto | null) => {
  return defineAbility<Ability>(can => {
    if (!session) {
      can('sign-in-as', 'User')

      return
    }

    const userId = session.userId

    can('sign-in-as', 'User', { id: { $ne: userId } })
    can('sign-out', 'User', { id: userId })

    // BOARD
    can('create', 'Board')

    can(['read', 'update', 'delete', 'update-access'], 'Board', {
      ownerId: userId,
    })
    can('read', 'Board', {
      editorIds: { $in: [userId] },
    })
  })
}
