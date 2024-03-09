import { CreateBoardButton, useCanCreateBoard } from '@/features/board/create-board'
import { CenterContentLayout } from '@/shared/ui/layouts'

import { BoardsList } from '../boards-list/boards-list'

export const BoardsPage = () => {
  const canCreate = useCanCreateBoard()

  const body = (
    <>
      <div className={'flex gap-2 mt-10'}>
        <CreateBoardButton />
      </div>
      <BoardsList className={'mt-10'} />
    </>
  )

  return (
    <CenterContentLayout className={'py-10'}>
      <h1 className={'text-3xl'}>Доски</h1>
      {canCreate ? (
        body
      ) : (
        <span className={'mt-5 text-xl block'}>У вас нет прав для работы с этой страницей</span>
      )}
    </CenterContentLayout>
  )
}
