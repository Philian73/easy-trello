import { useAbility } from '@/features/auth'
import { BoardsList, CreateBoardButton } from '@/features/boards-list'
import { CenterContentLayout } from '@/shared/ui/layouts'

import { BoardsListProviders } from '../boards-providers'

export const BoardsPage = () => {
  const ability = useAbility()

  const body = (
    <>
      <div className={'flex gap-2 mt-10'}>
        <CreateBoardButton />
      </div>
      <BoardsList className={'mt-10'} />
    </>
  )

  return (
    <BoardsListProviders>
      <CenterContentLayout className={'py-10'}>
        <h1 className={'text-3xl'}>Доски</h1>
        {ability.can('create', 'Board') ? (
          body
        ) : (
          <span className={'mt-5 text-xl block'}>У вас нет прав для работы с этой страницей.</span>
        )}
      </CenterContentLayout>
    </BoardsListProviders>
  )
}
