import { NavLink, type NavLinkProps } from 'react-router-dom'

import { ROUTER_PATHS } from '@/shared/constants'
import clsx from 'clsx'

export const NavLinks = () => {
  const linkClasses: NavLinkProps['className'] = ({ isActive }) => clsx(isActive && 'underline')

  return (
    <div className={'text-lg flex gap-5'}>
      <NavLink className={linkClasses} to={ROUTER_PATHS.USERS}>
        Пользователи
      </NavLink>
      <NavLink className={linkClasses} to={ROUTER_PATHS.BOARDS}>
        Доски
      </NavLink>
    </div>
  )
}
