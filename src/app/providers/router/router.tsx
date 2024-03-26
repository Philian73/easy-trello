import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { RootLayout } from '@/widgets/root-layout'

import { AuthGuard } from './auth-guard'
import { GuestGuard } from './guest-guard'
import { privateRoutes } from './private-routes'
import { publicRoutes } from './public-routes'

const router = createBrowserRouter([
  {
    children: [
      {
        children: publicRoutes,
        element: <GuestGuard />,
      },
      {
        children: privateRoutes,
        element: <AuthGuard />,
      },
      {
        element: <div>not found</div>,
        path: '*',
      },
    ],
    element: <RootLayout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
