import type { FC, PropsWithChildren } from 'react'

import { abilityContext, useAbilityFactory } from '@/features/auth'

export const AbilityProvider: FC<PropsWithChildren> = ({ children }) => {
  const ability = useAbilityFactory()

  return <abilityContext.Provider value={ability}>{children}</abilityContext.Provider>
}
