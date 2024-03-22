/* eslint-disable-next-line boundaries/entry-point, boundaries/element-types */
import { useInvalidateSession } from '@/entities/session/@x/user'
import { usersApi } from '@/shared/api'
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
  queryFn: usersApi.getUsers,
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
    mutationFn: usersApi.createUser,
    async onSettled() {
      await invalidateUsers()
    },
  })
}
// ==============================================================================
export const useRemoveUserMutation = () => {
  const invalidateSession = useInvalidateSession()
  const invalidateUsers = useInvalidateUsers()

  return useMutation({
    mutationKey: keys.removeUser(),
    mutationFn: usersApi.removeUser,
    async onSettled() {
      await invalidateSession()
      await invalidateUsers()
    },
  })
}
// ==============================================================================
