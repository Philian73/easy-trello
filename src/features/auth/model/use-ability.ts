import { useMemo } from 'react'

import { sessionQuery } from '@/entities/session'
import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'
import { subject as subjectDefault } from '@casl/ability'
import { useSuspenseQuery } from '@tanstack/react-query'

import { type Ability, abilityFactory } from './ability-factory'

export const abilityContext = createStrictContext<Ability>()

export const useAbility = () => {
  return useStrictContext(abilityContext)
}
export { subjectDefault }

export const useAbilityFactory = () => {
  const { data: session } = useSuspenseQuery({
    ...sessionQuery,
  })

  return useMemo(() => {
    return abilityFactory(session)
  }, [session])
}
