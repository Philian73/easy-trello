import { type ComponentPropsWithoutRef, type FC, useState } from 'react'

import { Icons } from '@/shared/assets/icons'

import { useCanUpdateBoard } from '../../model/use-can-update-board'
import { UpdateBoardModal } from '../update-board-modal/update-board-modal'

type UpdateBoardButtonProps = {
  boardId: string
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const UpdateBoardButton: FC<UpdateBoardButtonProps> = ({ boardId, ...rest }) => {
  const canUpdate = useCanUpdateBoard(boardId)
  const [open, setOpen] = useState(false)

  if (!canUpdate) {
    return null
  }

  return (
    <>
      <button {...rest} onClick={() => setOpen(true)}>
        <Icons.Edit className={'w-8 h-8 text-teal-600'} />
      </button>
      {open && <UpdateBoardModal boardId={boardId} onClose={() => setOpen(false)} open={open} />}
    </>
  )
}
