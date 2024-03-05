import type { Session } from './types'

import { persistStorage } from '@/shared/lib/localforage'

const SESSION_STORAGE_KEY = 'session_storage'

export const sessionRepository = {
  clearSession() {
    return persistStorage.setItemSafe(SESSION_STORAGE_KEY, undefined)
  },
  getSession() {
    return persistStorage.getItemSafe<Session | undefined>(SESSION_STORAGE_KEY, undefined)
  },
  saveSession(value: Session) {
    return persistStorage.setItemSafe(SESSION_STORAGE_KEY, value)
  },
}
