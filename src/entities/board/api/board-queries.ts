import { api } from '@/shared/api'
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'

/* eslint-disable perfectionist/sort-objects */
const keys = {
  root: ['board'] as const,
  list: () => [...keys.root, 'list'] as const,
  byId: (id: string) => [...keys.root, id] as const,
  createBoard: () => [...keys.root, 'createBoard'] as const,
  updateBoard: () => [...keys.root, 'updateBoard'] as const,
  removeBoard: () => [...keys.root, 'removeBoard'] as const,
  saveBoard: () => [...keys.root, 'saveBoard'] as const,
}

// ==============================================================================

export const boardsQuery = queryOptions({
  queryKey: keys.list(),
  queryFn: api.getBoards,
})

export const useInvalidateBoards = () => {
  const queryClient = useQueryClient()

  return () => queryClient.invalidateQueries({ queryKey: keys.list() })
}

// ==============================================================================

export const boardByIdQuery = (boardId: string) => {
  return queryOptions({
    queryKey: keys.byId(boardId),
    queryFn: async () => (await api.getBoardById(boardId)) ?? null,
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
    mutationFn: api.createBoard,
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
    mutationFn: ({ boardId, patch }: { boardId: string; patch: api.BoardPatchDto }) =>
      api.updateBoard(boardId, patch),
    async onSuccess(_, { boardId }) {
      await invalidateById(boardId)
    },
  })
}
// ==============================================================================
export const useRemoveBoardMutation = () => {
  const invalidateList = useInvalidateBoards()

  return useMutation({
    mutationKey: keys.removeBoard(),
    mutationFn: api.deleteBoard,
    async onSuccess() {
      await invalidateList()
    },
  })
}
// ==============================================================================
