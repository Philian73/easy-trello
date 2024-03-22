import type { SessionDto, SignInDto } from '../generated'

import { nanoid } from 'nanoid'

import { persistStorage } from '../../lib/localforage'
import { usersRepository } from './users-repository'

const SESSION_STORAGE_KEY = 'session_storage'

/* eslint-disable perfectionist/sort-objects */
export const sessionRepository = {
  async getSession() {
    return persistStorage.getItemSafe<SessionDto | null>(SESSION_STORAGE_KEY, null)
  },

  async signIn(data: SignInDto) {
    const users = await usersRepository.getUsers()

    const user = users.find(user => user.email === data.email && user.password === data.password)

    if (!user) {
      return null
    }

    const { id, email, name, role, avatarId } = user

    const session: SessionDto = {
      id: nanoid(),
      userId: id,
      email,
      name,
      avatarId,
      role,
    }

    return persistStorage.setItemSafe<SessionDto>(SESSION_STORAGE_KEY, session)
  },
  async signOut() {
    return persistStorage.setItemSafe<SessionDto | null>(SESSION_STORAGE_KEY, null)
  },
}
