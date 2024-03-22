import type { BoardAccessInfo } from './model/types'

import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'

type ManageBoardAccessDeps = {
  boardAccessInfo: BoardAccessInfo
}

export const manageBoardAccessDepsContext = createStrictContext<ManageBoardAccessDeps>()

export const useManageBoardAccessDeps = () => useStrictContext(manageBoardAccessDepsContext)
