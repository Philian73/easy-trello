import type { BoardPartial } from '@/entities/board'

import { type ComponentPropsWithoutRef, type FC, useCallback } from 'react'
import { toast } from 'react-toastify'

import { Icons } from '@/shared/assets/icons'
import { handleErrorResponse } from '@/shared/lib/utils'

import { useRemoveBoard } from '../../model/use-remove-board'

type RemoveBoardButtonProps = {
  board: BoardPartial
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const RemoveBoardButton: FC<RemoveBoardButtonProps> = ({ board, ...rest }) => {
  const removeBoard = useRemoveBoard()

  const handleRemoveBoard = useCallback(async () => {
    try {
      const res = await removeBoard(board)

      if (res !== null) {
        toast.success('Доска успешно удалена.')
      }
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  }, [board, removeBoard])

  return (
    <button {...rest} onClick={handleRemoveBoard}>
      <Icons.TrashOutlined className={'w-8 h-8 text-rose-500'} />
    </button>
  )
}
