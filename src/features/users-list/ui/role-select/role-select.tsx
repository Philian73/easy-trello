import type { UserRole } from '@/entities/user'

import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

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

export const RoleSelect: FC<RoleSelectProps> = ({ onChangeRole, role, ...rest }) => {
  const { t } = useTranslation()

  const { options, value } = useMemo(() => {
    const options: Option[] = [
      { id: 'user', label: t('pages.users.add_user_form.role_select.options.user') },
      { id: 'admin', label: t('pages.users.add_user_form.role_select.options.admin') },
    ]
    const value = role ? options.find(option => option.id === role) : undefined

    return { options, value }
  }, [t, role])

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
