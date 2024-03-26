import { Navigate, type RouteObject } from 'react-router-dom'

import { BoardPage } from '@/pages/board-page'
import { BoardsPage } from '@/pages/boards-page'
import { UsersPage } from '@/pages/users-page'
import { ROUTER_PATHS } from '@/shared/constants'

const { BOARD, BOARDS, HOME, USERS } = ROUTER_PATHS

export const privateRoutes: RouteObject[] = [
  {
    element: <Navigate to={USERS} />,
    path: HOME,
  },
  {
    element: <BoardsPage />,
    path: BOARDS,
  },
  {
    element: <BoardPage />,
    path: BOARD,
  },
  {
    element: <UsersPage />,
    path: USERS,
  },
]
