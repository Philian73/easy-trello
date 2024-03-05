import type { User } from '../../model/types'

import type { FC, ReactNode } from 'react'

import { getAvatarUrl } from '../../model/get-avatar-url'
import { useUsers } from '../../model/users-store'

type UsersListProps = {
  userActions?: (user: User) => ReactNode
}

export const UsersList: FC<UsersListProps> = ({ userActions }) => {
  const { users } = useUsers()

  return (
    <div className={'mt-10'}>
      <h2 className={'text-lg mb-2 font-semibold'}>Все пользователи</h2>

      <div>
        {users.map(user => (
          <div
            className={'px-5 py-2 border-b border-b-slate-3 flex gap-2 items-center '}
            key={user.id}
          >
            <div>
              <img
                alt={`Default user avatar №${user.avatarId}`}
                className={'w-12 h-12'}
                src={getAvatarUrl(user.avatarId)}
              />
            </div>
            <span className={'text-lg block'}>{user.name}</span>
            <div className={'ml-auto flex gap-2'}>{userActions?.(user)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
