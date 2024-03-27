import type { FC, PropsWithChildren } from 'react'

import { ComposeChildren } from '@/shared/lib/compose-children'
import { Confirmations } from '@/widgets/confirmations'

import { QueryClientProvider } from './query-client'
import { Router } from './router'
import { ThemeProvider } from './theme'
import { ToastProvider } from './toast'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ComposeChildren>
      <QueryClientProvider />
      <ThemeProvider />
      <Confirmations />
      <ToastProvider />
      <Router />
      {children}
    </ComposeChildren>
  )
}
