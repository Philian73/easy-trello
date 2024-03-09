import { useSession } from '@/entities/session'

export const useCanCreateTask = () => {
  const session = useSession(state => state.currentSession)

  return !!session
}
