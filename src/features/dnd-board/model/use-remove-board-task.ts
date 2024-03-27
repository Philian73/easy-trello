import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useGetConfirmation } from '@/shared/lib/confirmation'
import { handleErrorResponse } from '@/shared/lib/utils'

import { useBoardStore } from './use-board-store'

export const useRemoveBoardTask = (cardId: string, taskId: string) => {
  const { t } = useTranslation()

  const getConfirmation = useGetConfirmation()
  const removeBoardTaskRaw = useBoardStore().useSelector(state => state.removeBoardTask)

  const removeBoardTask = async () => {
    const confirmation = await getConfirmation({
      description: t('pages.board.tasks.remove.confirm'),
      title: t('pages.board.tasks.remove.title'),
    })

    if (!confirmation) {
      return null
    }

    removeBoardTaskRaw(cardId, taskId)
      .then(() => {
        toast.success(t('pages.board.tasks.remove.success-info'))
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  }

  return { removeBoardTask }
}
