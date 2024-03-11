import { type ComponentPropsWithoutRef, type FC, useState } from 'react'

import { Icons } from '@/shared/assets/icons'

import { UpdateTaskModal } from '../update-task-modal/update-task-modal'

type UpdateTaskButtonProps = {
  taskId: string
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const UpdateTaskButton: FC<UpdateTaskButtonProps> = ({ taskId, ...rest }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button {...rest} onClick={() => setOpen(true)}>
        <Icons.Edit className={'w-8 h-8 text-teal-600'} />
      </button>
      {open && <UpdateTaskModal onClose={() => setOpen(false)} open={open} taskId={taskId} />}
    </>
  )
}
