import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useRemoveUserMutation } from '@/entities/user'
import { useGetConfirmation } from '@/shared/lib/confirmation'
import { handleErrorResponse } from '@/shared/lib/utils'

export const useRemoveUser = (userId: string) => {
  const { t } = useTranslation()

  const getConfirmation = useGetConfirmation()
  const { isPending, mutateAsync: removeUserRaw } = useRemoveUserMutation()

  const removeUser = async () => {
    const confirmation = await getConfirmation({
      description: t('pages.users.remove-user.confirm'),
    })

    if (!confirmation) {
      return null
    }

    removeUserRaw(userId)
      .then(() => {
        toast.success(t('pages.users.remove-user.success-info'))
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  }

  return {
    isPending,
    removeUser,
  }
}
