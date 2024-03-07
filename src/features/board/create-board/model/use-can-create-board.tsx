import { useSession } from '@/entities/session'

export const useCanCreateBoard = () => {
  const session = useSession(state => state.currentSession)

  return !!session
}
