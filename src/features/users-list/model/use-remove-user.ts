import { toast } from 'react-toastify'

import { useRemoveUserMutation } from '@/entities/user'
import { useGetConfirmation } from '@/shared/lib/confirmation'
import { handleErrorResponse } from '@/shared/lib/utils'

export const useRemoveUser = () => {
  const getConfirmation = useGetConfirmation()
  const { isPending, mutateAsync: removeUserRaw } = useRemoveUserMutation()

  const removeUser = async (userId: string) => {
    const confirmation = await getConfirmation({
      description: 'Вы действительно хотите удалить пользователя?',
    })

    if (!confirmation) {
      return null
    }

    try {
      await removeUserRaw(userId)
      toast.success('Пользователь успешно удалён.')
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  }

  return {
    isPending,
    removeUser,
  }
}
