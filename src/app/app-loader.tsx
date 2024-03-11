import { type FC, type PropsWithChildren, useEffect, useState } from 'react'

import { useBoards } from '@/entities/board'
import { useSession } from '@/entities/session'
import { useTasks } from '@/entities/task'
import { useUsers } from '@/entities/user'
import { PageSpinner } from '@/shared/ui'

export const AppLoader: FC<PropsWithChildren> = ({ children }) => {
  const loadUsers = useUsers(state => state.loadUsers)
  const loadSession = useSession(state => state.loadSession)
  const loadBoards = useBoards(state => state.loadBoards)
  const loadTasks = useTasks(state => state.loadTasks)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    Promise.all([loadSession(), loadUsers(), loadBoards(), loadTasks()]).finally(() => {
      setIsLoading(false)
    })
  }, [loadSession, loadUsers, loadBoards, loadTasks])

  if (isLoading) {
    return <PageSpinner />
  }

  return <>{children}</>
}
