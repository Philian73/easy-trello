import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import { type User, UserPreview, useUsers } from '@/entities/user'
import clsx from 'clsx'

type UserListProps = {
  userActions?: (user: User) => ReactNode
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const UserList: FC<UserListProps> = ({ className, userActions, ...rest }) => {
  const users = useUsers(state => state.users)

  return (
    <div className={clsx('mt-10', className)} {...rest}>
      <h2 className={'text-lg mb-2 font-semibold'}>Все пользователи</h2>

      <div>
        {users.map(user => (
          <div
            className={'px-5 py-2 border-b border-b-slate-300 flex gap-2 items-center'}
            key={user.id}
          >
            <UserPreview avatarId={user.avatarId} name={user.name} size={'md'} />
            <div className={'ml-auto flex gap-2 shrink-0'}>{userActions?.(user)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
