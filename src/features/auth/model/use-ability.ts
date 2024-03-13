import { useMemo } from 'react'

import { useSession } from '@/entities/session'
import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'
import { subject } from '@casl/ability'

import { type Ability, abilityFactory } from './ability-factory'

export const abilityContext = createStrictContext<Ability>()

export const useAbility = () => {
  return useStrictContext(abilityContext)
}
export { subject }

export const useAbilityFactory = () => {
  const session = useSession(state => state.currentSession)

  const ability = useMemo(() => {
    return abilityFactory(session)
  }, [session])

  return ability
}
