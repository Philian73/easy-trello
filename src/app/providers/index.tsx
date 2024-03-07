import { ComposeChildren } from '@/shared/lib/compose-children'
import { Confirmations } from '@/widgets/confirmations'

import { Router } from './router'

export const Providers = () => {
  return (
    <ComposeChildren>
      <Confirmations />
      <Router />
    </ComposeChildren>
  )
}
