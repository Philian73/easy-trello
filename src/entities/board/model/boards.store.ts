import type { BoardPartial, CreateBoardData, UpdateBoardData } from './types'

import { nanoid } from 'nanoid'
import { create } from 'zustand'

import { boardsRepository } from './boards.repository'

export type BoardsStore = {
  boards: BoardPartial[]
  createBoard: (authorId: string, data: CreateBoardData) => Promise<void>
  getBoardById: (boardId?: string) => BoardPartial | undefined
  loadBoards: () => Promise<void>
  removeAuthorFromBoards: (userId: string) => Promise<void>
  removeBoard: (boardId: string) => Promise<void>
  updateBoard: (boardId: string, data: UpdateBoardData) => Promise<void>
}

export const useBoards = create<BoardsStore>((set, get) => ({
  boards: [],
  async createBoard(authorId, data) {
    const date = new Date().toISOString()

    const newBoard = {
      authorId,
      cards: [],
      created: date,
      id: nanoid(),
      ownerId: authorId,
      updated: date,
      ...data,
    }

    await boardsRepository.saveBoard(newBoard)

    set({ boards: await boardsRepository.getBoards() })
  },
  getBoardById(boardId) {
    return get().boards.find(board => board.id === boardId)
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
  async removeBoard(boardId) {
    await boardsRepository.removeBoard(boardId)

    set({
      boards: await boardsRepository.getBoards(),
    })
  },
  async updateBoard(boardId, data) {
    const board = await boardsRepository.getBoard(boardId)

    if (!board) {
      return
    }

    const newBoard = { ...board, ...data, updated: new Date().toISOString() }

    await boardsRepository.saveBoard(newBoard)

    set({
      boards: await boardsRepository.getBoards(),
    })
  },
}))
