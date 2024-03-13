import type { User } from '@/entities/user'

import type { ReactNode } from 'react'

import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'

type UsersListDeps = {
  onBeforeRemoveUser: (userId: string) => Promise<void>
  renderUserAuthAction: (user: User) => ReactNode
}

export const usersListDepsContext = createStrictContext<UsersListDeps>()

export const useUsersListDeps = () => useStrictContext(usersListDepsContext)
