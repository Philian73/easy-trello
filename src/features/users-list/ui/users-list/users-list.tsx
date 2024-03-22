import type { UserDto } from '@/shared/api'

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import { UserPreview, usersQuery } from '@/entities/user'
import { Icons } from '@/shared/assets/icons'
import { useQuery } from '@tanstack/react-query'

import { useRemoveUser } from '../../model/use-remove-user'

type UsersListProps = {
  renderUserAuthAction: (user: UserDto) => ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const UsersList: FC<UsersListProps> = ({ renderUserAuthAction, ...rest }) => {
  const { data: users } = useQuery({
    ...usersQuery,
    initialData: [],
  })

  const { isPending, removeUser } = useRemoveUser()

  return (
    <div {...rest}>
      {users.map(user => (
        <div
          className={'px-5 py-2 border-b border-b-slate-300 flex gap-2 items-center'}
          key={user.id}
        >
          <UserPreview avatarId={user.avatarId} name={user.name} size={'md'} />
          <div className={'ml-auto flex gap-2 shrink-0'}>
            {renderUserAuthAction(user)}
            <button disabled={isPending} onClick={() => removeUser(user.id)}>
              <Icons.TrashOutlined className={'w-8 h-8 text-rose-500'} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
