import { type FC, type PropsWithChildren, useEffect, useState } from 'react'

import { boardsQuery } from '@/entities/board'
import { usersQuery } from '@/entities/user'
import { PageSpinner } from '@/shared/ui'
import { useQueryClient } from '@tanstack/react-query'

export const PrivateLoader: FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    Promise.all([
      queryClient.prefetchQuery(boardsQuery),
      queryClient.prefetchQuery(usersQuery),
    ]).finally(() => {
      setIsLoading(false)
    })
  }, [queryClient])

  if (isLoading) {
    return <PageSpinner isLoading={isLoading} />
  }

  return <>{children}</>
}
