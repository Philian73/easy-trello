import type { UserRole } from '../../model/types'

import { type FC, useMemo } from 'react'

import { Select } from '@/shared/ui'

type Option = {
  id: UserRole
  label: string
}

type RoleSelectProps = {
  className?: string
  errorMessage?: string
  label?: string
  onChangeRole: (id?: string) => void
  role?: UserRole
}

const options: Option[] = [
  { id: 'user', label: 'Пользователь' },
  { id: 'admin', label: 'Администратор' },
]

export const RoleSelect: FC<RoleSelectProps> = ({
  className,
  errorMessage,
  label,
  onChangeRole,
  role,
}) => {
  const value = useMemo(() => {
    return role ? options.find(option => option.id === role) : undefined
  }, [role])

  const onChange = (option: Option) => {
    onChangeRole(option.id)
  }

  return (
    <Select
      className={className}
      errorMessage={errorMessage}
      getLabel={option => option.label}
      label={label}
      onChange={onChange}
      options={options}
      value={value}
    />
  )
}
