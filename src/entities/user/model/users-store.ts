import type { User } from './types'

import { nanoid } from 'nanoid'
import { create } from 'zustand'

import { usersRepository } from './users-repository'

type UsersStore = {
  createUser: (data: { avatarId: string; name: string }) => Promise<void>
  getUserById: (userId: string) => User | undefined
  loadUsers: () => Promise<void>
  removeUser: (userId: string) => Promise<void>
  users: User[]
  usersMap: () => Record<string, User>
}

export const useUsers = create<UsersStore>((set, get) => ({
  async createUser(data) {
    const newUser = { id: nanoid(), ...data }

    await usersRepository.createUser(newUser)

    set({
      users: await usersRepository.getUsers(),
    })
  },
  getUserById(userId: string) {
    return get().users.find(user => user.id === userId)
  },
  async loadUsers() {
    set({ users: await usersRepository.getUsers() })
  },
  async removeUser(userId) {
    await usersRepository.removeUser(userId)

    set({
      users: await usersRepository.getUsers(),
    })
  },
  users: [],
  usersMap() {
    return get().users.reduce(
      (acc, user) => {
        acc[user.id] = user

        return acc
      },
      {} as Record<string, User>
    )
  },
}))
