import type { User } from '@/entities/user'

import { useSession } from '@/entities/session'

export const useCheckSignIn = () => {
  const session = useSession(session => session.currentSession)

  return {
    isSignIn: !!session,
    isUserSignIn: (user: User) => user.id === session?.userId,
  }
}
