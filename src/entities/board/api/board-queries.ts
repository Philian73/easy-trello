/* eslint-disable perfectionist/sort-objects */
import { boardsApi } from '@/shared/api'
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'

const keys = {
  root: ['board'] as const,
  list: () => [...keys.root, 'list'] as const,
  byId: (id: string) => [...keys.list(), id] as const,
  createBoard: () => [...keys.root, 'createBoard'] as const,
  updateBoard: () => [...keys.root, 'updateBoard'] as const,
  removeBoard: () => [...keys.root, 'removeBoard'] as const,
  saveBoard: () => [...keys.root, 'saveBoard'] as const,
}

// ==============================================================================

export const boardsQuery = queryOptions({
  queryKey: keys.list(),
  queryFn: boardsApi.getBoards,
})

const useInvalidateBoards = () => {
  const queryClient = useQueryClient()

  return () => queryClient.invalidateQueries({ queryKey: keys.list() })
}

// ==============================================================================

export const boardByIdQuery = (boardId: string) => {
  return queryOptions({
    queryKey: keys.byId(boardId),
    queryFn: async () => (await boardsApi.getBoard(boardId)) ?? null,
  })
}

const useInvalidateBoardById = () => {
  const queryClient = useQueryClient()

  return async (boardId: string) => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: keys.list() }),
      queryClient.invalidateQueries({ queryKey: keys.byId(boardId) }),
    ])
  }
}

// ==============================================================================
export const useCreateBoardMutation = () => {
  const invalidateList = useInvalidateBoards()

  return useMutation({
    mutationKey: keys.createBoard(),
    mutationFn: boardsApi.createBoard,
    async onSuccess() {
      await invalidateList()
    },
  })
}
// ==============================================================================
export const useUpdateBoardMutation = () => {
  const invalidateById = useInvalidateBoardById()

  return useMutation({
    mutationKey: keys.updateBoard(),
    mutationFn: boardsApi.updateBoard,
    async onSuccess(_, { id }) {
      await invalidateById(id)
    },
  })
}
// ==============================================================================
export const useRemoveBoardMutation = () => {
  const invalidateList = useInvalidateBoards()

  return useMutation({
    mutationKey: keys.removeBoard(),
    mutationFn: boardsApi.removeBoard,
    async onSuccess() {
      await invalidateList()
    },
  })
}
// ==============================================================================
export const useSaveBoardMutation = () => {
  const invalidateById = useInvalidateBoardById()

  return useMutation({
    mutationKey: keys.saveBoard(),
    mutationFn: boardsApi.saveBoard,
    async onSuccess(_, { id }) {
      await invalidateById(id)
    },
  })
}
// ==============================================================================
