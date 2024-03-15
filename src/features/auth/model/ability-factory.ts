import { Session } from '@/entities/session'
import { MongoAbility, MongoQuery, defineAbility } from '@casl/ability'

type CRUD = 'create' | 'delete' | 'read' | 'update'
type Abilities =
  | ['sign-in-as' | 'sign-out', 'User' | { id: string }]
  | [CRUD, 'Board' | { editorsIds: string[]; ownerId: string }]
  | [CRUD, 'BoardCard' | { editorsIds: string[]; ownerId: string }]
  | [CRUD, 'BoardTask' | { editorsIds: string[]; ownerId: string }]
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

    can(['read', 'update', 'delete'], 'Board', {
      ownerId: userId,
    })
    can('read', 'Board', {
      editorsIds: { $in: [userId] },
    })

    // CARD
    can(['create', 'update', 'delete', 'read'], 'BoardCard', {
      ownerId: userId,
    })
    can(['create', 'update', 'delete', 'read'], 'BoardCard', {
      editorsIds: { $in: [userId] },
    })

    // TASK
    can(['create', 'update', 'delete', 'read'], 'BoardTask', {
      ownerId: userId,
    })
    can(['create', 'update', 'delete', 'read'], 'BoardTask', {
      editorsIds: { $in: [userId] },
    })
  })
}
