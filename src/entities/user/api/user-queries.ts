import { api } from '@/shared/api'
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'

/* eslint-disable perfectionist/sort-objects */
const keys = {
  root: ['user'] as const,
  list: () => [...keys.root, 'list'] as const,
  createUser: () => [...keys.root, 'createUser'] as const,
  removeUser: () => [...keys.root, 'removeUser'] as const,
}

// ==============================================================================

export const usersQuery = queryOptions({
  queryKey: keys.list(),
  queryFn: api.getUsers,
})

const useInvalidateUsers = () => {
  const queryClient = useQueryClient()

  return () => queryClient.invalidateQueries({ queryKey: keys.list() })
}

// ==============================================================================
export const useCreateUserMutation = () => {
  const invalidateUsers = useInvalidateUsers()

  return useMutation({
    mutationKey: keys.createUser(),
    mutationFn: api.createUser,
    async onSettled() {
      await invalidateUsers()
    },
  })
}
// ==============================================================================
export const useRemoveUserMutation = () => {
  const invalidateUsers = useInvalidateUsers()

  return useMutation({
    mutationKey: keys.removeUser(),
    mutationFn: api.deleteUser,
    async onSettled() {
      await invalidateUsers()
    },
  })
}
// ==============================================================================
