import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'

import { BoardAccessInfo } from './model/types'

type ManageBoardAccessDeps = {
  boardAccessInfo: BoardAccessInfo
}

export const manageBoardAccessDepsContext = createStrictContext<ManageBoardAccessDeps>()

export const useManageBoardAccessDeps = () => useStrictContext(manageBoardAccessDepsContext)
