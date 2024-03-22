import type { UserDto } from '@/shared/api'

import type { FC } from 'react'

import { Select } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'

import { usersQuery } from '../../api/user-queries'
import { UserPreview } from '../user-preview/user-preview'

type UserSelectProps = {
  className?: string
  errorMessage?: string
  filterOptions?: (option: UserDto) => boolean
  label?: string
  onChangeUserId: (id?: string) => void
  required?: boolean
  userId?: string
}

export const UserSelect: FC<UserSelectProps> = ({
  className,
  errorMessage,
  filterOptions = () => true,
  label,
  onChangeUserId,
  required,
  userId,
}) => {
  const { data: users } = useQuery({
    ...usersQuery,
    initialData: [],
    select: users => users.filter(filterOptions),
  })

  const user = users.find(user => user.id === userId)

  const options = required ? users : [{ id: '' } as UserDto, ...users]

  const onChangeUser = (user?: UserDto) => {
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
        user?.name ? <UserPreview size={'sm'} {...user} /> : <span>Не выбрано</span>
      }
      renderPreview={user =>
        user?.name ? (
          <UserPreview className={'shrink-0 px-1'} size={'sm'} {...user} />
        ) : (
          <span>Не выбрано</span>
        )
      }
      value={user ?? options[0]}
    />
  )
}
