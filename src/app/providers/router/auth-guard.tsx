import { Navigate, Outlet } from 'react-router-dom'

import { ROUTER_PATHS } from '@/shared/constants'
import { useAuthOutletContext } from '@/widgets/root-layout'

import { PrivateLoader } from '../../loaders/private-loader'

export const AuthGuard = () => {
  const { isAuthenticated } = useAuthOutletContext()

  return isAuthenticated ? (
    <PrivateLoader>
      <Outlet />
    </PrivateLoader>
  ) : (
    <Navigate to={ROUTER_PATHS.SIGN_IN} />
  )
}
