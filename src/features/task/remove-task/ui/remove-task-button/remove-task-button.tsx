import type { ComponentPropsWithoutRef, FC } from 'react'

import { Icons } from '@/shared/assets/icons'

import { useRemoveTask } from '../../model/use-remove-task'

type RemoveTaskButtonProps = {
  taskId: string
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const RemoveTaskButton: FC<RemoveTaskButtonProps> = ({ taskId, ...rest }) => {
  const removeTask = useRemoveTask()

  return (
    <button {...rest} onClick={() => removeTask(taskId)}>
      <Icons.TrashOutlined className={'w-8 h-8 text-rose-500'} />
    </button>
  )
}
