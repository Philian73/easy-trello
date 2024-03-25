import type { FC, PropsWithChildren } from 'react'

import { ComposeChildren } from '@/shared/lib/compose-children'
import { Confirmations } from '@/widgets/confirmations'

import { QueryClientProvider } from './query-client'
import { Router } from './router'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ComposeChildren>
      <QueryClientProvider />
      <Confirmations />
      {children}
      <Router />
    </ComposeChildren>
  )
}
