import type {
  Board,
  BoardCard,
  BoardTask,
  CreateBoardCardData,
  CreateBoardTaskData,
  UpdateBoardCardData,
  UpdateBoardTaskData,
} from './types'
import type { SessionDto } from '@/shared/api'

import { produce } from 'immer'
import { nanoid } from 'nanoid'
import { create } from 'zustand'

/* eslint-disable perfectionist/sort-object-types */
export type BoardStore = {
  board: Board

  createBoardCard: (data: CreateBoardCardData) => Promise<void>
  updateBoardCard: (cardId: string, data: UpdateBoardCardData) => Promise<void>
  removeBoardCard: (cardId: string) => Promise<void>
  moveBoardCard: (index: number, newIndex: number) => Promise<void>

  createBoardTask: (cardId: string, data: CreateBoardTaskData) => Promise<void>
  updateBoardTask: (cardId: string, taskId: string, data: UpdateBoardTaskData) => Promise<void>
  removeBoardTask: (cardId: string, taskId: string) => Promise<void>
  moveBoardTask: (
    start: { cardId: string; index: number },
    end: { cardId: string; index: number }
  ) => Promise<void>
}

/* eslint-disable perfectionist/sort-objects */
export const createBoardStore = ({
  board,
  session,
  saveBoard,
}: {
  board: Board
  session: SessionDto | null
  saveBoard: (board: Board) => Promise<void>
}) => {
  return create<BoardStore>((set, get) => ({
    board,

    async createBoardCard(data) {
      const board = get().board
      const date = new Date().toDateString()

      const newCard: BoardCard = {
        id: nanoid(),
        tasks: [],
        created: date,
        updated: date,
        authorId: session!.userId,
        ...data,
      }

      const newBoard = produce<Board>(draft => {
        draft.cards.push(newCard)
      })(board)

      set({
        board: newBoard,
      })

      return saveBoard(newBoard)
    },
    async updateBoardCard(cardId, data) {
      const board = get().board

      const newBoard = produce<Board>(draft => {
        const index = draft.cards.findIndex(card => card.id === cardId)

        if (index !== -1) {
          draft.cards[index] = { ...draft.cards[index], ...data, updated: new Date().toISOString() }
        } else {
          throw new Error('Card not found.')
        }
      })(board)

      set({
        board: newBoard,
      })

      return saveBoard(newBoard)
    },
    async removeBoardCard(cardId) {
      const board = get().board

      const newBoard = produce<Board>(draft => {
        const index = draft.cards.findIndex(card => card.id === cardId)

        if (index !== -1) {
          draft.cards.splice(index, 1)
        } else {
          throw new Error('Card not found.')
        }
      })(board)

      set({
        board: newBoard,
      })

      return saveBoard(newBoard)
    },
    async moveBoardCard(index, newIndex) {
      const board = get().board

      const newBoard = produce<Board>(draft => {
        const card = draft.cards[index]

        draft.cards.splice(index, 1)
        draft.cards.splice(newIndex, 0, card)
      })(board)

      set({
        board: newBoard,
      })

      set({
        board: newBoard,
      })

      return saveBoard(newBoard)
    },

    async createBoardTask(cardId, data) {
      const board = get().board
      const date = new Date().toISOString()

      const newTask: BoardTask = {
        id: nanoid(),
        created: date,
        updated: date,
        authorId: session!.userId,
        ...data,
      }

      const newBoard = produce<Board>(draft => {
        const index = draft.cards.findIndex(card => card.id === cardId)

        if (index !== -1) {
          draft.cards[index].tasks.push(newTask)
        } else {
          throw new Error('You cannot create a task on a non-existent card.')
        }
      })(board)

      set({
        board: newBoard,
      })

      return saveBoard(newBoard)
    },
    async updateBoardTask(cardId, taskId, data) {
      const board = get().board

      const newBoard = produce<Board>(draft => {
        const index = draft.cards.findIndex(card => card.id === cardId)

        if (index !== -1) {
          const itemIndex = draft.cards[index].tasks.findIndex(task => task.id === taskId)

          if (itemIndex !== -1) {
            draft.cards[index].tasks[itemIndex] = {
              ...draft.cards[index].tasks[itemIndex],
              ...data,
              updated: new Date().toISOString(),
            }
          } else {
            throw new Error('Task not found.')
          }
        } else {
          throw new Error('You cannot update a task in a non-existent card.')
        }
      })(board)

      set({
        board: newBoard,
      })

      return saveBoard(newBoard)
    },
    async removeBoardTask(cardId, taskId) {
      const board = get().board

      const newBoard = produce<Board>(draft => {
        const index = draft.cards.findIndex(card => card.id === cardId)

        if (index !== -1) {
          const itemIndex = draft.cards[index].tasks.findIndex(task => task.id === taskId)

          if (itemIndex !== -1) {
            draft.cards[index].tasks.splice(itemIndex, 1)
          } else {
            throw new Error('Task not found.')
          }
        } else {
          throw new Error('You cannot delete a task in a non-existent card.')
        }
      })(board)

      set({
        board: newBoard,
      })

      return saveBoard(newBoard)
    },
    async moveBoardTask(start, end) {
      const board = get().board
      const cards = board.cards

      let startCardIndex = -1
      let endCardIndex = -1
      let count = 0

      for (let i = 0; i < cards.length; i++) {
        if (count === 2) {
          break
        }
        if (cards[i].id === start.cardId) {
          startCardIndex = i
          count++
        }
        if (cards[i].id === end.cardId) {
          endCardIndex = i
          count++
        }
      }

      const newBoard = produce<Board>(draft => {
        if (startCardIndex !== -1 && endCardIndex !== -1) {
          const item = draft.cards[startCardIndex].tasks[start.index]

          draft.cards[startCardIndex].tasks.splice(start.index, 1)
          draft.cards[endCardIndex].tasks.splice(end.index, 0, item)
        }
      })(board)

      set({
        board: newBoard,
      })

      return saveBoard(newBoard)
    },
  }))
}
