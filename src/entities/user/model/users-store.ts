import type { User } from './types'

import { nanoid } from 'nanoid'
import { create } from 'zustand'

import { usersRepository } from './users-repository'

type UsersStore = {
  createUser: (data: { avatarId: string; name: string }) => Promise<void>
  loadUsers: () => Promise<void>
  removeUser: (userId: string) => Promise<void>
  users: User[]
}

export const useUsers = create<UsersStore>(set => ({
  async createUser(data) {
    const newUser = { id: nanoid(), ...data }

    await usersRepository.createUser(newUser)

    set({
      users: await usersRepository.getUsers(),
    })
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
}))
