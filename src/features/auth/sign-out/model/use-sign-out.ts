import { useSession } from '@/entities/session'

export const useSignOut = () => useSession(session => session.removeSession)
