import type { UserRole } from '@/entities/user'

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

export const RoleSelect: FC<RoleSelectProps> = ({ onChangeRole, role, ...rest }) => {
  const value = useMemo(() => {
    return role ? options.find(option => option.id === role) : undefined
  }, [role])

  const onChange = (option: Option) => {
    onChangeRole(option.id)
  }

  return (
    <Select
      {...rest}
      getLabel={option => option.label}
      onChange={onChange}
      options={options}
      value={value}
    />
  )
}
