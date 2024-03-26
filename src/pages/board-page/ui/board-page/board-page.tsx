import { useParams } from 'react-router-dom'

import { boardByIdQuery } from '@/entities/board'
import { Board, BoardSearch, CreateBoardCardButton } from '@/features/dnd-board'
import { BoardEditors, UpdateBoardAccessButton } from '@/features/manage-board-access'
import { PageSpinner } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'

import { getBoardPageSubject, useBoardPageAbility } from '../../model/use-board-page-ability'
import { BoardNotFound } from '../board-not-found/board-not-found'
import { BoardProviders } from '../board-providers'

const useBoard = () => {
  const params = useParams<'boardId'>()
  const boardId = params.boardId ?? ''

  const {
    data: board,
    error,
    isLoading,
  } = useQuery({
    ...boardByIdQuery(boardId),
    enabled: !!boardId,
  })

  const boardPageAbility = useBoardPageAbility()

  return {
    board,
    boardPageAbility,
    error,
    isLoading,
  }
}

export const BoardPage = () => {
  const { board, boardPageAbility, error, isLoading } = useBoard()

  if (isLoading) {
    return <PageSpinner isLoading={isLoading} />
  }

  if (error || !board) {
    return <BoardNotFound errorMessage={error?.message} />
  }

  const canUpdateAccess = boardPageAbility.can('update-access', getBoardPageSubject(board.ownerId))

  return (
    <BoardProviders board={board}>
      <div className={'flex flex-col py-3 px-4 grow'}>
        <h1 className={'text-3xl mb-4 shrink-0 '}>{board.title}</h1>
        <div className={'shrink-0 mb-2 flex gap-5'}>
          <div className={'flex gap-2 shrink-0 mb-2'}>
            <CreateBoardCardButton />
          </div>

          <BoardSearch />

          <BoardEditors />

          {canUpdateAccess && <UpdateBoardAccessButton />}
        </div>

        <Board className={'basis-0 grow'} />
      </div>
    </BoardProviders>
  )
}
