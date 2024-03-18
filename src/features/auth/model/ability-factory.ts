import { Session } from '@/entities/session'
import { MongoAbility, MongoQuery, defineAbility } from '@casl/ability'

type CRUD = 'create' | 'delete' | 'read' | 'update'
type UpdateAccess = 'update-access'
type Abilities =
  | ['sign-in-as' | 'sign-out', 'User' | { id: string }]
  | [CRUD | UpdateAccess, 'Board' | { editorsIds: string[]; ownerId: string }]
type Conditions = MongoQuery

export type Ability = MongoAbility<Abilities, Conditions>

export const abilityFactory = (session: Session | undefined) => {
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
      editorsIds: { $in: [userId] },
    })
  })
}
