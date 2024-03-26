import { toast } from 'react-toastify'

import { useGetConfirmation } from '@/shared/lib/confirmation'
import { handleErrorResponse } from '@/shared/lib/utils'

import { useBoardStore } from './use-board-store'

export const useRemoveBoardCard = (cardId: string) => {
  const getConfirmation = useGetConfirmation()
  const removeBoardCardRaw = useBoardStore().useSelector(state => state.removeBoardCard)

  const removeBoardCard = async () => {
    const confirmation = await getConfirmation({
      description: 'Вы уверены, что хотите удалить эту карточку?',
      title: 'Удаление карточки',
    })

    if (!confirmation) {
      return null
    }

    removeBoardCardRaw(cardId)
      .then(() => {
        toast.success('Карточка успешно удалена.')
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  }

  return { removeBoardCard }
}
