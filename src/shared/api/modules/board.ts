import { nanoid } from 'nanoid'

import { persistStorage } from '../../lib/localforage'
import { type SessionDto, authApi } from './auth'

export type BoardDto = {
  authorId: string
  cards: BoardCardDto[]
  created: string
  editorIds: string[]
  id: string
  ownerId: string
  title: string
  updated: string
}

export type BoardPartialDto = Omit<BoardDto, 'authorId' | 'cards' | 'created' | 'updated'>

export type BoardCardDto = {
  authorId: string
  created: string
  id: string
  tasks: BoardTaskDto[]
  title: string
  updated: string
}

export type BoardTaskDto = {
  assigneeId?: string
  authorId: string
  created: string
  description?: string
  id: string
  title: string
  updated: string
}

export type CreateBoardDto = {
  editorIds: string[]
  title: string
}

export type UpdateBoardDto = {
  cards: BoardCardDto[]
  editorIds: string[]
  ownerId: string
  title: string
}

const BOARDS_STORAGE_KEY = 'boards_storage'

/* eslint-disable perfectionist/sort-objects */
export const boardsApi = {
  async getBoards(): Promise<BoardPartialDto[]> {
    const session = await authApi.me()

    if (!session) {
      throw new Error('Not authorized.')
    }

    return persistStorage.getItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, [])
  },

  async getBoard(boardId: string): Promise<BoardDto | undefined> {
    const boards = (await boardsApi.getBoards()) as BoardDto[]

    return boards.find(board => board.id === boardId)
  },

  async createBoard(data: CreateBoardDto) {
    const boards = (await boardsApi.getBoards()) as BoardDto[]
    const { userId } = (await authApi.me()) as SessionDto

    const dateNow = new Date().toISOString()

    const newBoard: BoardDto = {
      ...data,
      cards: [],
      id: nanoid(),
      ownerId: userId,
      authorId: userId,
      created: dateNow,
      updated: dateNow,
    }

    boards.push(newBoard)

    await persistStorage.setItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, boards)
  },

  async updateBoard(path: Partial<UpdateBoardDto> & { id: string }) {
    const { id, ...restPath } = path

    const session = await authApi.me()
    const boards = (await boardsApi.getBoards()) as BoardDto[]

    const boardIndex = boards.findIndex(board => board.id === id)

    if (boardIndex === -1) {
      throw new Error('Board not found.')
    }

    if (boards[boardIndex].ownerId === session?.userId) {
      boards[boardIndex] = { ...boards[boardIndex], ...restPath }

      await persistStorage.setItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, boards)
    } else {
      throw new Error('You do not have permission to edit this board.')
    }
  },

  async removeBoard(boardId: string) {
    const session = await authApi.me()
    const boards = (await boardsApi.getBoards()) as BoardDto[]

    const boardIndex = boards.findIndex(board => board.id === boardId)

    if (boardIndex === -1) {
      throw new Error('Board not found.')
    }

    if (boards[boardIndex].ownerId === session?.userId) {
      boards.splice(boardIndex, 1)
      await persistStorage.setItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, boards)
    } else {
      throw new Error('You do not have permission to delete this board.')
    }
  },

  async saveBoard(value: BoardDto) {
    const boards = (await boardsApi.getBoards()) as BoardDto[]
    const boardIndex = boards.findIndex(board => board.id === value.id)

    if (boardIndex !== -1) {
      boards[boardIndex] = value
    } else {
      boards.push(value)
    }

    await persistStorage.setItemSafe<BoardDto[]>(BOARDS_STORAGE_KEY, boards)
  },

  /**
   * private
   */
  async removeAuthorFromBoards(userId: string) {
    const boards = (await boardsApi.getBoards()) as BoardDto[]

    for (let board of boards) {
      if (board.ownerId === userId) {
        await boardsApi.removeBoard(board.id)
      }

      if (board.editorIds.some(id => id === userId)) {
        board = { ...board, editorIds: board.editorIds.filter(id => id !== userId) }
        await boardsApi.updateBoard(board)
      }
    }
  },
}
