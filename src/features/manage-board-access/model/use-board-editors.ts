import { useMemo } from 'react'

import { useUsers } from '@/entities/user'

import { useManageBoardAccessDeps } from '../deps'

export const useBoardEditors = () => {
  const {
    boardAccessInfo: { editorsIds, ownerId },
  } = useManageBoardAccessDeps()

  const usersMap = useUsers(state => state.usersMap())

  const { editors, owner } = useMemo(() => {
    return {
      editors: editorsIds ? editorsIds?.map(id => usersMap[id].avatarId) : [],
      owner: usersMap[ownerId]?.avatarId,
    }
  }, [editorsIds, ownerId, usersMap])

  return { editors, owner }
}
