import { Navigate, Outlet } from 'react-router-dom'

import { ROUTER_PATHS } from '@/shared/constants'
import { useAuthOutletContext } from '@/widgets/root-layout'

export const GuestGuard = () => {
  const { isAuthenticated } = useAuthOutletContext()

  return isAuthenticated ? <Navigate to={ROUTER_PATHS.USERS} /> : <Outlet />
}
