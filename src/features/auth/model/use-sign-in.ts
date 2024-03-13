import type { User } from '@/entities/user'

import { useSession } from '@/entities/session'

export const useSignIn = () => {
  const createSession = useSession(state => state.createSession)

  return (user: User) => createSession({ userId: user.id, ...user })
}
