import type { BoardPartial } from '@/entities/board'

import type { ComponentPropsWithoutRef, FC } from 'react'

import { Icons } from '@/shared/assets/icons'

import { useRemoveBoard } from '../../model/use-remove-board'

type RemoveBoardButtonProps = {
  board: BoardPartial
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const RemoveBoardButton: FC<RemoveBoardButtonProps> = ({ board, ...rest }) => {
  const removeBoard = useRemoveBoard()

  return (
    <button {...rest} onClick={() => removeBoard(board)}>
      <Icons.TrashOutlined className={'w-8 h-8 text-rose-500'} />
    </button>
  )
}
