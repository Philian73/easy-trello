import type { BoardPartial } from '@/features/boards-list'

import { Navigate, useParams } from 'react-router-dom'

import { boardByIdQuery } from '@/entities/board'
import { sessionQuery } from '@/entities/session'
import { subjectDefault, useAbility } from '@/features/auth'
import { Board, BoardSearch, CreateBoardCardButton } from '@/features/dnd-board'
import { BoardEditors, UpdateBoardAccessButton } from '@/features/manage-board-access'
import { PageSpinner } from '@/shared/ui'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

import { BoardProviders } from '../board-providers'

const subject = subjectDefault<'Board', BoardPartial>

const useBoard = () => {
  const ability = useAbility()

  const { data: session } = useSuspenseQuery(sessionQuery)

  const params = useParams<'boardId'>()
  const boardId = params.boardId ?? ''

  const { data: board, isError } = useQuery({
    ...boardByIdQuery(boardId),
    enabled: !!boardId,
  })

  return {
    ability,
    board,
    isError,
    session,
  }
}

export const BoardPage = () => {
  const { ability, board, isError, session } = useBoard()

  if (!session) {
    return <div>Не авторизован</div>
  }

  if (isError) {
    return <Navigate to={'*'} />
  }

  if (!board) {
    return <PageSpinner />
  }

  const canReadBoard = ability.can('read', subject('Board', board))
  const canUpdateAccess = ability.can('update-access', subject('Board', board))

  if (!canReadBoard) {
    return <span className={'mt-5 text-xl block'}>У вас нет прав для работы с этой страницей.</span>
  }

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
