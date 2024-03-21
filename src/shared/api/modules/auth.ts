import { nanoid } from 'nanoid'

import { persistStorage } from '../../lib/localforage'
import { type UserDto, usersApi } from './user'

export type SessionDto = {
  id: string
  userId: string
} & Pick<UserDto, 'avatarId' | 'name'>

const SESSION_STORAGE_KEY = 'session_storage'

/* eslint-disable perfectionist/sort-objects */
export const authApi = {
  async me() {
    return persistStorage.getItemSafe<SessionDto | null>(SESSION_STORAGE_KEY, null)
  },

  async login(data: UserDto) {
    const users = await usersApi.getUsers()

    const user = users.find(user => user.id === data.id)

    if (!user) {
      throw new Error('User not found.')
    }

    const session: SessionDto = {
      ...user,
      id: nanoid(),
      userId: user.id,
    }

    return persistStorage.setItemSafe<SessionDto>(SESSION_STORAGE_KEY, session)
  },

  async logout() {
    return persistStorage.setItemSafe<SessionDto | null>(SESSION_STORAGE_KEY, null)
  },
}
