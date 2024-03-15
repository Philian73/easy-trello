import type { BoardTask, UpdateBoardTaskData } from '@/entities/board'

import type { FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { UserSelect } from '@/entities/user'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Dialog, type DialogProps, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'

import { useUpdateBoardTask } from '../../model/use-update-board-task'

type UpdateBoardTaskModalProps = {
  cardId: string
  /**
   * Cancel and confirm buttons from the "Dialog" component
   */
  children?: ReactNode
  task: BoardTask
} & Omit<
  DialogProps,
  'cancelButtonText' | 'children' | 'confirmButtonDisabled' | 'confirmButtonText' | 'title'
>

export const UpdateBoardTaskModal: FC<UpdateBoardTaskModalProps> = ({
  cardId,
  children,
  onClose,
  task,
  ...rest
}) => {
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm<UpdateBoardTaskData>({
    defaultValues: {
      assigneeId: task.assigneeId ?? '',
      description: task.description ?? '',
      title: task.title ?? '',
    },
  })
  const { canAssigneeUserToTask, updateBoardTask } = useUpdateBoardTask()

  const onSubmit = handleSubmit(async data => {
    try {
      await updateBoardTask(cardId, task.id, data, onClose)
      toast.success('Задача успешно обновлена.')
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  })

  return (
    <Dialog
      onClose={onClose}
      {...rest}
      cancelButtonText={'Отмена'}
      confirmButtonDisabled={!isDirty}
      confirmButtonText={'Обновить'}
      title={'Редактирование задачи'}
    >
      <form noValidate onSubmit={onSubmit}>
        <TextField
          errorMessage={errors.title?.message}
          label={'Название'}
          {...register('title', { required: 'Название задачи - обязательно поле.' })}
        />

        <TextField.TextArea
          errorMessage={errors.description?.message}
          label={'Описание'}
          rows={4}
          {...register('description')}
        />

        <Controller
          control={control}
          name={'assigneeId'}
          render={({ field: { onChange, value } }) => (
            <UserSelect
              className={'w-full'}
              errorMessage={errors.assigneeId?.message}
              filterOptions={canAssigneeUserToTask}
              label={'Исполнитель'}
              onChangeUserId={onChange}
              userId={value}
            />
          )}
        />

        {children}

        {import.meta.env.DEV && <DevTool control={control} />}
      </form>
    </Dialog>
  )
}
