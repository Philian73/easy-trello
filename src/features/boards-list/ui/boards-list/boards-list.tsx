import type { ComponentPropsWithoutRef, FC } from 'react'
import { Link } from 'react-router-dom'

import { boardsQuery } from '@/entities/board'
import { AvatarList, UserPreview, usersQuery } from '@/entities/user'
import { listToRecord } from '@/shared/lib/list-to-record'
import { useQuery } from '@tanstack/react-query'

import { generateBoardUrl } from '../../model/generate-board-url'
import { getBoardsListsSubject, useBoardsListAbility } from '../../model/use-boards-list-ability'
import { RemoveBoardButton } from '../remove-board-button/remove-board-button'
import { UpdateBoardButton } from '../update-board-button/update-board-button'

type BoardsListProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const BoardsList: FC<BoardsListProps> = props => {
  const { data: usersMap = {} } = useQuery({
    ...usersQuery,
    select: listToRecord,
  })

  const { data: boards } = useQuery({
    ...boardsQuery,
    initialData: [],
    select: boards =>
      boards.map(board => ({
        ...board,
        editors: board.editorIds.map(id => usersMap[id].avatarId),
        owner: usersMap[board.ownerId],
      })),
  })

  const boardsListAbility = useBoardsListAbility()

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
          {boards?.map(board => (
            <tr className={'px-5 py-2 border-b border-b-slate-3'} key={board.id}>
              <td className={'p-2'}>
                <Link className={'text-xl text-blue-500'} to={generateBoardUrl(board.id)}>
                  {board.title}
                </Link>
              </td>
              <td className={'p-2'}>
                <UserPreview size={'md'} {...board.owner} />
              </td>
              <td className={'p-2'}>
                <AvatarList avatarIds={board.editors} />
              </td>
              <td className={'p-2'}>
                <div className={'flex gap-2 ml-auto'}>
                  {boardsListAbility.can('update', getBoardsListsSubject(board)) && (
                    <UpdateBoardButton board={board} />
                  )}
                  {boardsListAbility.can('delete', getBoardsListsSubject(board)) && (
                    <RemoveBoardButton boardId={board.id} />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
