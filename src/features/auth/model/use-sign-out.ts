import { useSession } from '@/entities/session'

export const useSignOut = () => {
  return useSession(state => state.removeSession)
}
