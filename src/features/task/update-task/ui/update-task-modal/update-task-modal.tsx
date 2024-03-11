import type { ComponentPropsWithoutRef, FC } from 'react'

import { Dialog } from '@/shared/ui'

import { UpdateTaskForm } from '../update-task-form/update-task-form'

type UpdateTaskModalProps = {
  taskId: string
} & Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children'>

export const UpdateTaskModal: FC<UpdateTaskModalProps> = ({ onClose, taskId, ...rest }) => {
  return (
    <Dialog
      cancelButtonText={'Отмена'}
      confirmButtonText={'Обновить'}
      onClose={onClose}
      title={'Редактирование задачи'}
      {...rest}
    >
      <UpdateTaskForm onSuccess={onClose} taskId={taskId} />
    </Dialog>
  )
}
