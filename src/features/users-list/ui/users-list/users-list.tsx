import { type ComponentPropsWithoutRef, type FC, useCallback } from 'react'
import { toast } from 'react-toastify'

import { UserPreview, useUsers } from '@/entities/user'
import { Icons } from '@/shared/assets/icons'

import { useUsersListDeps } from '../../deps'
import { useRemoveUser } from '../../model/use-remove-user'

type UsersListProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const UsersList: FC<UsersListProps> = props => {
  const users = useUsers(state => state.users)
  const removeUser = useRemoveUser()
  const { renderUserAuthAction } = useUsersListDeps()

  const handleRemoveUser = useCallback(
    (userId: string) => async () => {
      const res = await removeUser(userId)

      if (res !== null) {
        toast.success('Пользователь успешно удалён.')
      }
    },
    [removeUser]
  )

  return (
    <div {...props}>
      {users.map(user => (
        <div
          className={'px-5 py-2 border-b border-b-slate-300 flex gap-2 items-center'}
          key={user.id}
        >
          <UserPreview avatarId={user.avatarId} name={user.name} size={'md'} />
          <div className={'ml-auto flex gap-2 shrink-0'}>
            {renderUserAuthAction(user)}
            <button onClick={handleRemoveUser(user.id)}>
              <Icons.TrashOutlined className={'w-8 h-8 text-rose-500'} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
