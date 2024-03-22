import { nanoid } from 'nanoid'

import { persistStorage } from '../../lib/localforage'
import { authApi } from './auth'
import { boardsApi } from './board'

export type UserDto = {
  avatarId: string
  created: string
  id: string
  name: string
  updated: string
}

export type CreateUserDto = Pick<UserDto, 'avatarId' | 'name'>

const USERS_STORAGE_KEY = 'users_storage'

/* eslint-disable perfectionist/sort-objects */
export const usersApi = {
  async getUsers() {
    return await persistStorage.getItemSafe<UserDto[]>(USERS_STORAGE_KEY, [])
  },

  async createUser(data: CreateUserDto) {
    const users = await usersApi.getUsers()
    const dateNow = new Date().toISOString()

    const newUser: UserDto = {
      ...data,
      id: nanoid(),
      created: dateNow,
      updated: dateNow,
    }

    users.push(newUser)

    await persistStorage.setItemSafe<UserDto[]>(USERS_STORAGE_KEY, users)
  },

  async removeUser(userId: string) {
    const users = await usersApi.getUsers()

    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex !== -1) {
      await boardsApi.removeAuthorFromBoards(userId)
      const session = await authApi.me()

      if (session?.userId === userId) {
        await authApi.logout()
      }

      users.splice(userIndex, 1)

      await persistStorage.setItemSafe<UserDto[]>(USERS_STORAGE_KEY, users)
    } else {
      throw new Error('User not found.')
    }
  },
}
