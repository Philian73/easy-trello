import { useGetConfirmation } from '@/shared/lib/confirmation'

import { useBoardDeps } from '../deps'
import { useBoardStore } from './use-board-store'

export const useRemoveBoardCard = () => {
  const board = useBoardStore().useSelector(state => state.board)

  const getConfirmation = useGetConfirmation()
  const { carRemoveBoardCard } = useBoardDeps()
  const removeBoardCardRaw = useBoardStore().useSelector(state => state.removeBoardCard)

  const removeBoardCard = async (cardId: string) => {
    const confirmation = await getConfirmation({
      description: 'Вы уверены, что хотите удалить эту карточку?',
      title: 'Удаление карточки',
    })

    if (!confirmation) {
      return null
    }

    if (!carRemoveBoardCard(board)) {
      throw new Error('У вас нет прав для удаления этой карточки.')
    }

    await removeBoardCardRaw(cardId)
  }

  return { removeBoardCard }
}
