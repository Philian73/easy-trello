import type { User } from '@/entities/user'

import { useSession } from '@/entities/session'

export const useSignInUser = () => {
  const createSession = useSession(session => session.createSession)

  return (user: User) =>
    createSession({
      userId: user.id,
      ...user,
    })
}
