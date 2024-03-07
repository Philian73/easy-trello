import type { Board, BoardPartial } from './types'

import { persistStorage } from '@/shared/lib/localforage'

const BOARDS_STORAGE_KEY = 'boards_storage'

export const boardsRepository = {
  async getBoard(id: string): Promise<Board | undefined> {
    return persistStorage
      .getItemSafe<Board[]>(BOARDS_STORAGE_KEY, [])
      .then(boards => boards.find(board => board.id === id))
  },
  async getBoards(): Promise<BoardPartial[]> {
    return persistStorage.getItemSafe<Board[]>(BOARDS_STORAGE_KEY, []).then(boards =>
      boards.map(board => ({
        editorsIds: board.editorsIds,
        id: board.id,
        name: board.name,
        ownerId: board.ownerId,
      }))
    )
  },
  async removeBoard(boardId: string) {
    const boards = await this.getBoards()

    await persistStorage.setItemSafe(
      BOARDS_STORAGE_KEY,
      boards.filter(board => board.id !== boardId)
    )
  },
  async saveBoard(value: Board) {
    const boards = await this.getBoards()
    const boardIndex = boards.findIndex(board => board.id === value.id)

    if (boardIndex === -1) {
      boards.push(value)
    } else {
      boards[boardIndex] = value
    }

    await persistStorage.setItemSafe(BOARDS_STORAGE_KEY, boards)
  },
}
