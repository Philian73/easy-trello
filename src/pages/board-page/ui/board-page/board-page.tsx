import type { BoardPartialSubject } from '@/entities/board'

import { useParams } from 'react-router-dom'

import { useSession } from '@/entities/session'
import { subjectDefault, useAbility } from '@/features/auth'
import { Board, CreateBoardCardButton, useFetchBoard } from '@/features/dnd-board'
import { ComposeChildren } from '@/shared/lib/compose-children'
import { PageSpinner } from '@/shared/ui'

import { BoardDepsProvider, BoardStoreProvider } from '../board-providers/board-providers'

const subject = subjectDefault<'Board', BoardPartialSubject>

export const BoardPage = () => {
  const ability = useAbility()

  const params = useParams<'boardId'>()
  const boardId = params.boardId
  const session = useSession(state => state.currentSession)

  const { board } = useFetchBoard(boardId)

  if (!session) {
    return <div>Не авторизован</div>
  }

  if (!board) {
    return <PageSpinner />
  }

  return (
    <ComposeChildren>
      <BoardDepsProvider />
      <BoardStoreProvider board={board} />
      {ability.can(
        'read',
        subject('Board', { editorsIds: board.editorsIds, ownerId: board.ownerId })
      ) ? (
        <div className={'flex flex-col py-3 px-4 grow'}>
          <h1 className={'text-3xl mb-4 shrink-0 '}>{board.title}</h1>
          <div className={'flex gap-2 shrink-0 mb-2'}>
            <CreateBoardCardButton />
          </div>
          <Board className={'basis-0 grow'} />
        </div>
      ) : (
        <span className={'mt-5 text-xl block'}>У вас нет прав для работы с этой страницей.</span>
      )}
    </ComposeChildren>
  )
}
