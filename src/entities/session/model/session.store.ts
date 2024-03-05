import type { Session } from './types'

import { nanoid } from 'nanoid'
import { create } from 'zustand'

import { sessionRepository } from './sesson.repository'

type CreateSessionData = {
  avatarId: string
  name: string
  userId: string
}

type SessionStore = {
  createSession: (session: CreateSessionData) => Promise<void>
  currentSession?: Session
  loadSession: () => Promise<void>
  removeSession: () => Promise<void>
}

export const useSession = create<SessionStore>(set => ({
  createSession: async data => {
    const newSession = { ...data, id: nanoid() }

    await sessionRepository.saveSession(newSession)

    set({ currentSession: newSession })
  },
  currentSession: undefined,
  loadSession: async () => {
    const session = await sessionRepository.getSession()

    set({ currentSession: session })
  },
  removeSession: async () => {
    await sessionRepository.clearSession()

    set({ currentSession: undefined })
  },
}))
