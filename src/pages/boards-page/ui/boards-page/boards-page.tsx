import { CreateBoardButton, useCanCreateBoard } from '@/features/board/create-board'
import { BoardsList } from '@/pages/boards-page/ui/boards-list/boards-list'
import { CenterContentLayout } from '@/shared/ui/layouts'

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
