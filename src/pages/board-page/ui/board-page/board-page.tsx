import type { BoardPartialSubject } from '@/entities/board'

import { useParams } from 'react-router-dom'

import { useSession } from '@/entities/session'
import { subjectDefault, useAbility } from '@/features/auth'
import { Board, CreateBoardCardButton, useFetchBoard } from '@/features/dnd-board'
import { BoardEditors, UpdateBoardAccessButton } from '@/features/manage-board-access'
import { ComposeChildren } from '@/shared/lib/compose-children'
import { PageSpinner } from '@/shared/ui'

import { BoardDepsProvider, BoardStoreProvider } from '../board-providers/board-providers'

const subject = subjectDefault<'Board', BoardPartialSubject>

const useBoard = () => {
  const session = useSession(state => state.currentSession)

  const ability = useAbility()

  const params = useParams<'boardId'>()
  const boardId = params.boardId

  return {
    ...useFetchBoard(boardId),
    ability,
    session,
  }
}

export const BoardPage = () => {
  const { ability, board, fetchBoard, session } = useBoard()

  if (!session) {
    return <div>Не авторизован</div>
  }

  if (!board) {
    return <PageSpinner />
  }

  const manageBoardAccess: BoardPartialSubject = {
    editorsIds: board.editorsIds,
    ownerId: board.ownerId,
  }

  const canReadBoard = ability.can('read', subject('Board', manageBoardAccess))
  const canUpdateAccess = ability.can('update-access', subject('Board', manageBoardAccess))

  return (
    <ComposeChildren>
      <BoardStoreProvider board={board} />
      <BoardDepsProvider board={board} />
      {canReadBoard ? (
        <div className={'flex flex-col py-3 px-4 grow'}>
          <h1 className={'text-3xl mb-4 shrink-0 '}>{board.title}</h1>
          <div className={'shrink-0 mb-2 flex gap-5'}>
            <div className={'flex gap-2 shrink-0 mb-2'}>
              <CreateBoardCardButton />
            </div>

            <BoardEditors />

            {canUpdateAccess && <UpdateBoardAccessButton onUpdate={fetchBoard} />}
          </div>

          <Board className={'basis-0 grow'} />
        </div>
      ) : (
        <span className={'mt-5 text-xl block'}>У вас нет прав для работы с этой страницей.</span>
      )}
    </ComposeChildren>
  )
}
