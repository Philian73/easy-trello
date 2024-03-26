import type { RouteObject } from 'react-router-dom'

import { SignInPage } from '@/pages/sign-in-page'
import { ROUTER_PATHS } from '@/shared/constants'

export const publicRoutes: RouteObject[] = [
  {
    element: <SignInPage />,
    path: ROUTER_PATHS.SIGN_IN,
  },
]
