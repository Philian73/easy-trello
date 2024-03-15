import type { FC, PropsWithChildren } from 'react'

import { useBoards } from '@/entities/board'
import { useSession } from '@/entities/session'
import { SignInButton, SignOutButton, subjectDefault, useAbility } from '@/features/auth'
import { usersListDepsContext } from '@/features/users-list'

const subject = subjectDefault<'User', { id: string }>

export const UsersPageProviders: FC<PropsWithChildren> = ({ children }) => {
  const ability = useAbility()
  const removeSession = useSession(state => state.removeSession)

  const removeAuthorFromBoards = useBoards(state => state.removeAuthorFromBoards)

  return (
    <usersListDepsContext.Provider
      value={{
        onBeforeRemoveUser: async userId => {
          await removeSession()
          await removeAuthorFromBoards(userId)
        },
        renderUserAuthAction: user => {
          const canSignIn = ability.can('sign-in-as', subject('User', { id: user.id }))
          const canSignOut = ability.can('sign-out', subject('User', { id: user.id }))

          if (canSignIn) {
            return <SignInButton user={user} />
          }
          if (canSignOut) {
            return <SignOutButton />
          }
        },
      }}
    >
      {children}
    </usersListDepsContext.Provider>
  )
}
