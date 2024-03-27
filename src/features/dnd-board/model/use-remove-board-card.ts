import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useGetConfirmation } from '@/shared/lib/confirmation'
import { handleErrorResponse } from '@/shared/lib/utils'

import { useBoardStore } from './use-board-store'

export const useRemoveBoardCard = (cardId: string) => {
  const { t } = useTranslation()

  const getConfirmation = useGetConfirmation()
  const removeBoardCardRaw = useBoardStore().useSelector(state => state.removeBoardCard)

  const removeBoardCard = async () => {
    const confirmation = await getConfirmation({
      description: t('pages.board.cards.remove.confirm'),
      title: t('pages.board.cards.remove.title'),
    })

    if (!confirmation) {
      return null
    }

    removeBoardCardRaw(cardId)
      .then(() => {
        toast.success(t('pages.board.cards.remove.success-info'))
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  }

  return { removeBoardCard }
}
