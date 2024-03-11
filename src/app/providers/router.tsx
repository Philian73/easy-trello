import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'

import { BoardPage } from '@/pages/board-page'
import { BoardsPage } from '@/pages/boards-page'
import { TasksPage } from '@/pages/tasks-page'
import { UsersPage } from '@/pages/users-page'
import { ROUTER_PATHS } from '@/shared/constants'
import { RootLayout } from '@/widgets/root-layout'

const { BOARD, BOARDS, HOME, TASKS, USERS } = ROUTER_PATHS

const router = createBrowserRouter([
  {
    children: [
      {
        loader: () => redirect(USERS),
        path: '',
      },
      {
        element: <TasksPage />,
        path: TASKS,
      },
      {
        element: <BoardPage />,
        path: BOARD,
      },
      {
        element: <BoardsPage />,
        path: BOARDS,
      },
      {
        element: <UsersPage />,
        path: USERS,
      },
    ],
    element: <RootLayout />,
    path: HOME,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
