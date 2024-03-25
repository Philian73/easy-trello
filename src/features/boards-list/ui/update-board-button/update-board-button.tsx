import type { BoardPartial } from '@/entities/board'

import { type ComponentPropsWithoutRef, type FC, useState } from 'react'

import { Icons } from '@/shared/assets/icons'

import { UpdateBoardModal } from '../update-board-modal/update-board-modal'

type UpdateBoardButtonProps = {
  board: BoardPartial
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const UpdateBoardButton: FC<UpdateBoardButtonProps> = ({ board, ...rest }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button {...rest} onClick={() => setOpen(true)}>
        <Icons.Edit className={'w-8 h-8 text-teal-600'} />
      </button>
      {open && <UpdateBoardModal board={board} onClose={() => setOpen(false)} open={open} />}
    </>
  )
}
