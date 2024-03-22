import type { BoardDto, BoardPatchDto, CreateBoardDto } from '../generated'

import { nanoid } from 'nanoid'

import { persistStorage } from '../../lib/localforage'

const BOARDS_STORAGE_KEY = 'boards_storage'

/* eslint-disable perfectionist/sort-objects */
export const boardsRepository = {
  async getBoards() {
    return persistStorage.getItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, [])
  },
  async getBoard(boardId: string) {
    const boards = await boardsRepository.getBoards()

    return boards.find(board => board.id === boardId)
  },

  async createBoard(data: CreateBoardDto & { authorId: string; ownerId: string }) {
    const boards = await boardsRepository.getBoards()

    const dateNow = new Date().toISOString()

    const newBoard: BoardDto = {
      ...data,
      id: nanoid(),
      cards: [],
      created: dateNow,
      updated: dateNow,
    }

    boards.push(newBoard)

    await persistStorage.setItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, boards)

    return newBoard
  },
  async updateBoard(boardId: string, patch: BoardPatchDto) {
    const boards = await boardsRepository.getBoards()
    const boardIndex = boards.findIndex(board => board.id === boardId)

    if (boardIndex === -1) {
      throw new Error('Board not found.')
    }

    boards[boardIndex] = { ...boards[boardIndex], ...patch, updated: new Date().toISOString() }

    await persistStorage.setItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, boards)
  },
  async removeBoard(boardId: string) {
    const boards = await boardsRepository.getBoards()
    const boardIndex = boards.findIndex(board => board.id === boardId)

    if (boardIndex === -1) {
      throw new Error('Board not found.')
    }

    boards.splice(boardIndex, 1)
    await persistStorage.setItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, boards)
  },

  // private
  async removeAuthorFromBoards(userId: string) {
    const boards = await boardsRepository.getBoards()

    for (let board of boards) {
      if (board.ownerId === userId) {
        await boardsRepository.removeBoard(board.id)
      }

      if (board.editorIds.some(id => id === userId)) {
        board = { ...board, editorIds: board.editorIds.filter(id => id !== userId) }
        await boardsRepository.updateBoard(board.id, board)
      }
    }
  },
}
