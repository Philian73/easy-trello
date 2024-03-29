import type { ComponentPropsWithoutRef, FC } from 'react'

import { UserPreview, usersQuery } from '@/entities/user'
import { useQuery } from '@tanstack/react-query'

import { getUserSubject, useUsersListAbility } from '../../model/use-users-list-ability'
import { RemoveUserButton } from '../remove-user-button/remove-user-button'

type UsersListProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const UsersList: FC<UsersListProps> = props => {
  const { data: users } = useQuery({
    ...usersQuery,
    initialData: [],
  })

  const usersListAbility = useUsersListAbility()

  return (
    <div {...props}>
      {users.map(user => (
        <div
          className={'px-5 py-2 border-b border-b-slate-300 flex gap-2 items-center'}
          key={user.id}
        >
          <UserPreview avatarId={user.avatarId} name={user.name} size={'md'} />
          <div className={'ml-auto flex gap-2 shrink-0'}>
            {usersListAbility.can('delete', getUserSubject(user.id)) && (
              <RemoveUserButton userId={user.id} />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
