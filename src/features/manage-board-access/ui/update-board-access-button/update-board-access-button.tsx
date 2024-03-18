import { type ComponentPropsWithoutRef, type FC, useState } from 'react'

import { Icons } from '@/shared/assets/icons'

import { UpdateBoardAccessModal } from '../update-board-access-modal/update-board-access-modal'

type UpdateBoardAccessButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const UpdateBoardAccessButton: FC<UpdateBoardAccessButtonProps> = props => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button {...props} onClick={() => setOpen(true)}>
        <Icons.Edit className={'w-8 h-8 text-teal-600'} />
      </button>
      {open && <UpdateBoardAccessModal onClose={() => setOpen(false)} open={open} />}
    </>
  )
}
