import type { AbilityTuple, MongoAbility } from '@casl/ability'

import { useMemo } from 'react'

export type Ability<T extends AbilityTuple> = MongoAbility<T>

export const createModuleAbility = <T extends AbilityTuple, D>({
  abilityFactory,
  useData,
}: {
  abilityFactory: (data: D) => Ability<T>
  useData: () => D
}) => {
  return () => {
    const data = useData()

    return useMemo(() => abilityFactory(data), [data])
  }
}
