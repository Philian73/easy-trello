import type { ComponentPropsWithoutRef, FC } from 'react'

import { Icons } from '@/shared/assets/icons'

import { useRemoveBoard } from '../../model/use-remove-board'

type RemoveBoardButtonProps = {
  boardId: string
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'disabled' | 'onClick'>

export const RemoveBoardButton: FC<RemoveBoardButtonProps> = ({ boardId, ...rest }) => {
  const { isPending, removeBoard } = useRemoveBoard(boardId)

  return (
    <button {...rest} disabled={isPending} onClick={removeBoard}>
      <Icons.TrashOutlined className={'w-8 h-8 text-rose-500'} />
    </button>
  )
}
