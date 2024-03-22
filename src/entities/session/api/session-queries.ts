import { authApi } from '@/shared/api'
import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query'

/* eslint-disable perfectionist/sort-objects */
const keys = {
  root: ['session'] as const,
  currentUser: () => [...keys.root, 'currentUser'] as const,
  loginUser: () => [...keys.root, 'loginUser'] as const,
  logoutUser: () => [...keys.root, 'logoutUser'] as const,
}

// ==============================================================================

export const sessionQuery = queryOptions({
  queryKey: keys.currentUser(),
  queryFn: authApi.me,
  staleTime: 1000 * 60 * 5,
})

export const useInvalidateSession = () => {
  const queryClient = useQueryClient()

  return () => queryClient.invalidateQueries({ queryKey: keys.root })
}

// ==============================================================================
export const useLoginMutation = () => {
  const invalidateSession = useInvalidateSession()

  return useMutation({
    mutationKey: keys.loginUser(),
    mutationFn: authApi.login,
    async onSuccess() {
      await invalidateSession()
    },
  })
}
// ==============================================================================
export const useLogoutMutation = () => {
  const invalidateSession = useInvalidateSession()

  return useMutation({
    mutationKey: keys.logoutUser(),
    mutationFn: authApi.logout,
    async onSuccess() {
      await invalidateSession()
    },
  })
}
// ==============================================================================
