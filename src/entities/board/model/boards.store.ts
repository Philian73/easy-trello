import type { BoardPartial, CreateBoardData, UpdateBoardData } from './types'

import { nanoid } from 'nanoid'
import { create } from 'zustand'

import { boardsRepository } from './boards.repository'

export type BoardsStore = {
  boards: BoardPartial[]
  createBoard: (ownerId: string, data: CreateBoardData) => Promise<void>
  getBoardById: (id?: string) => BoardPartial | undefined
  loadBoards: () => Promise<void>
  removeAuthorFromBoards: (userId: string) => Promise<void>
  removeBoard: (userId: string) => Promise<void>
  updateBoard: (id: string, data: UpdateBoardData) => Promise<void>
}

export const useBoards = create<BoardsStore>((set, get) => ({
  boards: [],
  async createBoard(ownerId, data) {
    const newBoard = { id: nanoid(), ownerId, ...data, cols: [] }

    await boardsRepository.saveBoard(newBoard)

    set({ boards: await boardsRepository.getBoards() })
  },
  getBoardById(id) {
    return get().boards.find(board => board.id === id)
  },
  async loadBoards() {
    set({ boards: await boardsRepository.getBoards() })
  },
  async removeAuthorFromBoards(userId) {
    for (const board of get().boards) {
      const newBoard = {
        ...board,
        editorsIds: board.editorsIds.filter(id => id !== userId),
      }

      if (newBoard.ownerId === userId) {
        await get().removeBoard(newBoard.id)
      } else {
        await get().updateBoard(newBoard.id, newBoard)
      }
    }
  },
  async removeBoard(userId) {
    await boardsRepository.removeBoard(userId)

    set({
      boards: await boardsRepository.getBoards(),
    })
  },
  async updateBoard(id, data) {
    const board = await boardsRepository.getBoard(id)

    if (!board) {
      return
    }

    const newBoard = { ...board, ...data }

    await boardsRepository.saveBoard(newBoard)

    set({
      boards: await boardsRepository.getBoards(),
    })
  },
}))
