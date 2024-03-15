import { useMemo } from 'react'

import { useSession } from '@/entities/session'
import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'
import { subject } from '@casl/ability'

import { type Ability, abilityFactory } from './ability-factory'

export const abilityContext = createStrictContext<Ability>()

export const useAbility = () => {
  return useStrictContext(abilityContext)
}
export { subject as subjectDefault }

export const useAbilityFactory = () => {
  const session = useSession(state => state.currentSession)

  return useMemo(() => {
    return abilityFactory(session)
  }, [session])
}
