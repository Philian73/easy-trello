import { ComponentPropsWithoutRef, FC } from 'react'

import { useCanRemoveBoard } from '@/features/board/remove-board/model/use-can-remove-board'
import { useRemoveBoard } from '@/features/board/remove-board/model/use-remove-board'
import { Icons } from '@/shared/assets/icons'

type RemoveBoardButtonProps = {
  boardId: string
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const RemoveBoardButton: FC<RemoveBoardButtonProps> = ({ boardId, ...rest }) => {
  const canRemove = useCanRemoveBoard(boardId)
  const removeBoard = useRemoveBoard()

  if (!canRemove) {
    return null
  }

  return (
    <button {...rest} onClick={() => removeBoard(boardId)}>
      <Icons.TrashOutlined className={'w-8 h-8 text-rose-500'} />
    </button>
  )
}
