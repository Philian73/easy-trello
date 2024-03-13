import { ComposeChildren } from '@/shared/lib/compose-children'
import { Confirmations } from '@/widgets/confirmations'

import { AbilityProvider } from './ability'
import { Router } from './router'

export const Providers = () => {
  return (
    <ComposeChildren>
      <Confirmations />
      <AbilityProvider />
      <Router />
    </ComposeChildren>
  )
}
