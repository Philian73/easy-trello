import type { FC, PropsWithChildren } from 'react'

import { queryClient } from '@/shared/api'
import { QueryClientProvider as TanStackQueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </TanStackQueryClientProvider>
  )
}
