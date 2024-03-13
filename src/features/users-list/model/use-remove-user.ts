import { useUsers } from '@/entities/user'
import { useGetConfirmation } from '@/shared/lib/confirmation'

import { useUsersListDeps } from '../deps'

export const useRemoveUser = () => {
  const { onBeforeRemoveUser } = useUsersListDeps()
  const getConfirmation = useGetConfirmation()
  const removeUser = useUsers(state => state.removeUser)

  return async (userId: string) => {
    const confirmation = await getConfirmation({
      description: 'Вы действительно хотите удалить пользователя?',
    })

    if (!confirmation) {
      return
    }

    await onBeforeRemoveUser(userId)
    await removeUser(userId)
  }
}
