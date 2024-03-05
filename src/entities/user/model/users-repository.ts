import type { User } from './types'

import { persistStorage } from '@/shared/lib/localforage'

const USERS_STORAGE_KEY = 'users_storage'

export const usersRepository = {
  async createUser(value: User) {
    const users = await this.getUsers()

    await persistStorage.setItemSafe(USERS_STORAGE_KEY, users.concat([value]))
  },
  async getUsers() {
    return await persistStorage.getItemSafe<User[]>(USERS_STORAGE_KEY, [])
  },
  async removeUser(userId: string) {
    const users = await this.getUsers()

    await persistStorage.setItemSafe(
      USERS_STORAGE_KEY,
      users.filter(user => user.id !== userId)
    )
  },
}
