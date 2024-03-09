import type { FC } from 'react'

import { Combobox } from '@/shared/ui'

import { type User, UserPreview, useUsers } from '../../'

type UserMultiSelectProps = {
  className?: string
  errorMessage?: string
  label?: string
  onChangeUserIds: (ids: string[]) => void
  userIds: string[]
}

export const UserMultiSelect: FC<UserMultiSelectProps> = ({
  className,
  errorMessage,
  label,
  onChangeUserIds,
  userIds,
}) => {
  const users = useUsers(state => state.users)
  const selectedUsers = users.filter(user => userIds.includes(user.id))
  const onChangeUsers = (users: User[]) => {
    onChangeUserIds(users.map(u => u.id))
  }

  return (
    <Combobox
      className={className}
      errorMessage={errorMessage}
      getLabel={user => user.name}
      label={label}
      multiple
      onChange={onChangeUsers}
      options={users}
      renderOption={user => <UserPreview size={'sm'} {...user} />}
      renderPreview={users =>
        users?.map(user => (
          <UserPreview className={'shrink-0 px-1'} key={user.id} size={'sm'} {...user} />
        ))
      }
      value={selectedUsers}
    />
  )
}
