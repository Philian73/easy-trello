import { useMemo } from 'react'

import { usersQuery } from '@/entities/user'
import { listToRecord } from '@/shared/lib/list-to-record'
import { useQuery } from '@tanstack/react-query'

import { useManageBoardAccessDeps } from '../deps'

export const useBoardEditors = () => {
  const {
    boardAccessInfo: { editorIds, ownerId },
  } = useManageBoardAccessDeps()

  const { data: usersMap = {} } = useQuery({
    ...usersQuery,
    initialData: [],
    select: listToRecord,
  })

  const { editors, owner } = useMemo(() => {
    return {
      editors: editorIds ? editorIds?.map(id => usersMap[id].avatarId) : [],
      owner: usersMap[ownerId],
    }
  }, [editorIds, ownerId, usersMap])

  return { editors, owner }
}
