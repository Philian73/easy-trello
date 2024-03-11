import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { BoardSelect } from '@/entities/board'
import { type UpdateTaskData, useTasks } from '@/entities/task'
import { updateTaskDepsContext } from '@/features/task/update-task'
import { useStrictContext } from '@/shared/lib/hooks'
import { TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'

import { useUpdateTask } from '../../model/use-update-task'

type UpdateTaskFormProps = {
  /**
   * Cancel and confirm buttons from the "Dialog" component
   */
  children?: ReactNode
  onSuccess: () => void
  taskId: string
} & Omit<ComponentPropsWithoutRef<'form'>, 'children' | 'onSubmit'>

export const UpdateTaskForm: FC<UpdateTaskFormProps> = ({
  children,
  onSuccess,
  taskId,
  ...rest
}) => {
  const task = useTasks(state => state.getTaskById(taskId))

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateTaskData>({
    defaultValues: {
      boardId: task?.boardId ?? '',
      description: task?.description ?? '',
      title: task?.title ?? '',
    },
  })
  const { canViewBoard } = useStrictContext(updateTaskDepsContext)

  const { updateTask } = useUpdateTask(taskId)

  const onSubmit = handleSubmit(data => updateTask(data, onSuccess))

  return (
    <form noValidate {...rest} onSubmit={onSubmit}>
      <TextField
        errorMessage={errors.title?.message}
        label={'Название'}
        {...register('title', { required: 'Название задачи - обязательное поле.' })}
      />

      <TextField.TextArea
        errorMessage={errors.description?.message}
        label={'Описание'}
        rows={4}
        {...register('description')}
      />

      <Controller
        control={control}
        name={'boardId'}
        render={({ field: { onChange, value } }) => (
          <BoardSelect
            boardId={value}
            className={'w-full'}
            errorMessage={errors.boardId?.message}
            filterOptions={board => canViewBoard(board.id)}
            label={'Доска'}
            onChangeBoardId={onChange}
          />
        )}
      />

      {children}

      {import.meta.env.DEV && <DevTool control={control} />}
    </form>
  )
}
