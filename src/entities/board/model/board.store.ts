import type { Board } from './types'

import { create } from 'zustand'

import { boardsRepository } from './boards.repository'

export type BoardStore = {
  board: Board | undefined
  errorMessage?: string
  isLoading?: boolean
  loadBoard: () => Promise<void>
  saveBoard: (value: Board) => Promise<void>
}

export const createBoardStore = ({ boardId }: { boardId: string }) => {
  return create<BoardStore>(set => ({
    board: undefined,
    errorMessage: undefined,
    isLoading: false,
    async loadBoard() {
      set({ isLoading: true })

      const board = await boardsRepository.getBoard(boardId).finally(() => {
        set({ isLoading: false })
      })

      set({ board })
    },
    async saveBoard(value) {
      await boardsRepository.saveBoard(value)

      set({ board: value })
    },
  }))
}
