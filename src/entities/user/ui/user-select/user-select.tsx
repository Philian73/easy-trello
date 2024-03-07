import type { FC } from 'react'

import { Select } from '@/shared/ui'

import { type User, UserPreview, useUsers } from '../../'

type UserSelectProps = {
  className?: string
  errorMessage?: string
  label?: string
  onChangeUserId: (id?: string) => void
  required?: boolean
  userId?: string
}

export const UserSelect: FC<UserSelectProps> = ({
  className,
  errorMessage,
  label,
  onChangeUserId,
  required,
  userId,
}) => {
  const user = useUsers(state => (userId ? state.getUserById(userId) : undefined))
  const users = useUsers(state => state.users)

  const options = required ? users : [undefined, ...users]

  const onChangeUser = (user?: User) => {
    onChangeUserId(user?.id)
  }

  return (
    <Select
      className={className}
      errorMessage={errorMessage}
      getLabel={user => user?.name ?? ''}
      label={label}
      onChange={onChangeUser}
      options={options}
      renderOption={user =>
        user ? <UserPreview size={'sm'} {...user} /> : <span>Не выбрано</span>
      }
      renderPreview={user =>
        !Array.isArray(user) && user ? (
          <UserPreview className={'shrink-0 px-1'} size={'sm'} {...user} />
        ) : (
          <span>Не выбрано</span>
        )
      }
      value={user}
    />
  )
}
