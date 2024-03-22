import type { CreateUserDto, UserDto } from '../generated'

import { nanoid } from 'nanoid'

import { persistStorage } from '../../lib/localforage'
import { boardsRepository } from './boards-repository'

type User = UserDto & {
  password: string
}

const USERS_STORAGE_KEY = 'users_storage'

/* eslint-disable perfectionist/sort-objects */
export const usersRepository = {
  async getUsers() {
    return persistStorage.getItemSafe<User[]>(USERS_STORAGE_KEY, [])
  },

  async createUser(data: CreateUserDto) {
    const users = await usersRepository.getUsers()

    const dateNow = new Date().toISOString()

    const newUser: User = {
      ...data,
      id: nanoid(),
      created: dateNow,
      updated: dateNow,
    }

    users.push(newUser)

    await persistStorage.setItemSafe<User[]>(USERS_STORAGE_KEY, users)

    return newUser
  },
  async removeUser(userId: string) {
    const users = await usersRepository.getUsers()

    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex === -1) {
      throw new Error('User not found.')
    }

    await boardsRepository.removeAuthorFromBoards(userId)

    users.splice(userIndex, 1)

    await persistStorage.setItemSafe<User[]>(USERS_STORAGE_KEY, users)
  },
}
