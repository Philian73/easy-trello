import type { User } from '../../model/types'

import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Select } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'

import { usersQuery } from '../../api/user-queries'
import { UserPreview } from '../user-preview/user-preview'

type UserSelectProps = {
  className?: string
  errorMessage?: string
  filterOptions?: (option: User) => boolean
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
  const { t } = useTranslation()

  const { data: users } = useQuery({
    ...usersQuery,
    initialData: [],
    select: users => users.filter(filterOptions),
  })

  const user = users.find(user => user.id === userId)

  const options = required ? users : [{ id: '' } as User, ...users]

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
        user?.name ? <UserPreview size={'sm'} {...user} /> : <span>{t('common.no-select')}</span>
      }
      renderPreview={user =>
        user?.name ? (
          <UserPreview className={'shrink-0 px-1'} size={'sm'} {...user} />
        ) : (
          <span>{t('common.no-select')}</span>
        )
      }
      value={user ?? options[0]}
    />
  )
}
