import type { ComponentPropsWithoutRef, FC } from 'react'
import { Link } from 'react-router-dom'

import { useBoards } from '@/entities/board'
import { AvatarList, UserPreview, useUsers } from '@/entities/user'

import { useBoardsListDeps } from '../../deps'
import { generateBoardUrl } from '../../model/generate-board-url'
import { RemoveBoardButton } from '../remove-board-button/remove-board-button'
import { UpdateBoardButton } from '../update-board-button/update-board-button'

type BoardsListProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const BoardsList: FC<BoardsListProps> = props => {
  const boards = useBoards(state => state.boards)
  const users = useUsers(state => state.usersMap())

  const { canRemoveBoard, canUpdateBoard, canViewBoard } = useBoardsListDeps()

  return (
    <div {...props}>
      <h2 className={'text-lg mb-2 font-semibold'}>Все доски</h2>
      <table className={'w-full'}>
        <thead>
          <tr>
            <th className={'text-start'}>Название:</th>
            <th className={'text-start'}>Админ:</th>
            <th className={'text-start'}>Редакторы:</th>
            <th className={'w-1'}></th>
          </tr>
        </thead>
        <tbody>
          {boards.filter(canViewBoard).map(board => (
            <tr className={'px-5 py-2 border-b border-b-slate-3'} key={board.id}>
              <td className={'p-2'}>
                <Link className={'text-xl text-blue-500'} to={generateBoardUrl(board.id)}>
                  {board.title}
                </Link>
              </td>
              <td className={'p-2'}>
                <UserPreview size={'md'} {...users[board.ownerId]} />
              </td>
              <td className={'p-2'}>
                <AvatarList avatarIds={board.editorsIds.map(id => users[id].avatarId)} />
              </td>
              <td className={'p-2'}>
                <div className={'flex gap-2 ml-auto'}>
                  {canUpdateBoard(board) && <UpdateBoardButton board={board} />}
                  {canRemoveBoard(board) && <RemoveBoardButton board={board} />}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
