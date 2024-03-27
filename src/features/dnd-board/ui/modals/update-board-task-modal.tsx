import type { UpdateBoardTaskData } from '../../model/types'
import type { BoardTask } from '@/entities/board'

import type { FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { UserSelect } from '@/entities/user'
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
  const { t } = useTranslation()

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
  const { canAssigneeUserToTask, updateBoardTask } = useUpdateBoardTask(cardId, task.id, onClose)

  return (
    <Dialog
      onClose={onClose}
      {...rest}
      cancelButtonText={t('common.cancel')}
      confirmButtonDisabled={!isDirty}
      confirmButtonText={t('common.update')}
      title={t('pages.board.tasks.update.title')}
    >
      <form noValidate onSubmit={handleSubmit(updateBoardTask)}>
        <TextField
          errorMessage={errors.title?.message}
          label={t('common.name')}
          {...register('title', {
            validate: str => {
              if (str?.trim().length === 0) {
                return t('pages.board.tasks.update.error')
              }
            },
          })}
        />

        <TextField.TextArea
          errorMessage={errors.description?.message}
          label={t('common.description')}
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
              label={t('common.executor')}
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
