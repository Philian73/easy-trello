import { BoardsList, CreateBoardButton } from '@/features/boards-list'
import { CenterContentLayout } from '@/shared/ui/layouts'

export const BoardsPage = () => {
  return (
    <CenterContentLayout className={'py-10'}>
      <h1 className={'text-3xl'}>Доски</h1>
      <div className={'flex gap-2 mt-10'}>
        <CreateBoardButton />
      </div>
      <BoardsList className={'mt-10'} />
    </CenterContentLayout>
  )
}
