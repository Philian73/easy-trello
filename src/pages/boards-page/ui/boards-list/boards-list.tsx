import type { ComponentPropsWithoutRef, FC } from 'react'
import { Link } from 'react-router-dom'

import { useBoards } from '@/entities/board'
import { AvatarList, UserPreview, useUsers } from '@/entities/user'
import { RemoveBoardButton } from '@/features/board/remove-board'
import { UpdateBoardButton } from '@/features/board/update-board'
import { useCanViewBoardFn } from '@/features/board/view-board'

import { generateBoardUrl } from '../../model/generate-board-url'

type BoardsList = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const BoardsList: FC<BoardsList> = props => {
  const boards = useBoards(state => state.boards)
  const users = useUsers(state => state.usersMap())

  const canViewBoard = useCanViewBoardFn()

  return (
    <div {...props}>
      <h2 className={'text-lg mb-2 font-semibold'}>Все доски</h2>
      <table className={'w-full'}>
        <thead>
          <tr>
            <th className={'text-start'}>Название:</th>
            <th className={'text-start'}>Админ:</th>
            <th className={'text-start'}>Редакторы:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {boards
            .filter(board => canViewBoard(board.id))
            .map(board => (
              <tr className={'px-5 py-2 border-b border-b-slate-3 '} key={board.id}>
                <td className={'p-2'}>
                  <Link className={'text-xl text-blue-500'} to={generateBoardUrl(board.id)}>
                    {board.name}
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
                    <UpdateBoardButton boardId={board.id} />
                    <RemoveBoardButton boardId={board.id} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
