import { useTranslation } from 'react-i18next'
import { NavLink, type NavLinkProps } from 'react-router-dom'

import { ROUTER_PATHS } from '@/shared/constants'
import clsx from 'clsx'

export const NavLinks = () => {
  const { t } = useTranslation()

  const linkClasses: NavLinkProps['className'] = ({ isActive }) => clsx(isActive && 'underline')

  return (
    <div className={'text-lg flex gap-5'}>
      <NavLink className={linkClasses} to={ROUTER_PATHS.USERS}>
        {t('pages.users.title.users')}
      </NavLink>
      <NavLink className={linkClasses} to={ROUTER_PATHS.BOARDS}>
        {t('pages.boards.title.boards')}
      </NavLink>
    </div>
  )
}
