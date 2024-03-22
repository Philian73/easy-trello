import { type FC, type PropsWithChildren, useEffect, useState } from 'react'

import { boardsQuery } from '@/entities/board'
import { sessionQuery } from '@/entities/session'
import { usersQuery } from '@/entities/user'
import { PageSpinner } from '@/shared/ui'
import { useQueryClient } from '@tanstack/react-query'

export const AppLoader: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    Promise.all([
      queryClient.prefetchQuery(sessionQuery),
      queryClient.prefetchQuery(usersQuery),
      queryClient.prefetchQuery(boardsQuery),
    ]).finally(() => {
      setIsLoading(false)
    })
  }, [queryClient])

  if (isLoading) {
    return <PageSpinner />
  }

  return <>{children}</>
}
