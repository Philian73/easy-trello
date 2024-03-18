import { type ComponentPropsWithoutRef, type FC, useState } from 'react'

import { Icons } from '@/shared/assets/icons'

import { UpdateBoardAccessModal } from '../update-board-access-modal/update-board-access-modal'

type UpdateBoardAccessButtonProps = {
  onUpdate: () => void
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const UpdateBoardAccessButton: FC<UpdateBoardAccessButtonProps> = ({
  onUpdate,
  ...rest
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button {...rest} onClick={() => setOpen(true)}>
        <Icons.Edit className={'w-8 h-8 text-teal-600'} />
      </button>
      {open && (
        <UpdateBoardAccessModal
          onClose={() => {
            onUpdate()
            setOpen(false)
          }}
          open={open}
        />
      )}
    </>
  )
}
