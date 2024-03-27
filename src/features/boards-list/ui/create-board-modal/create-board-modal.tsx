import type { CreateBoardFormData } from '../../model/types'

import type { FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useCreateBoardMutation } from '@/entities/board'
import { UserMultiSelect } from '@/entities/user'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Dialog, type DialogProps, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'

type CreateBoardModalProps = {
  /**
   * Cancel and confirm buttons from the "Dialog" component
   */
  children?: ReactNode
} & Omit<
  DialogProps,
  'cancelButtonText' | 'children' | 'confirmButtonDisabled' | 'confirmButtonText' | 'title'
>

export const CreateBoardModal: FC<CreateBoardModalProps> = ({ children, onClose, ...rest }) => {
  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateBoardFormData>({
    defaultValues: {
      editorIds: [],
      title: '',
    },
  })
  const { isPending, mutateAsync: createBoard } = useCreateBoardMutation()

  const onSubmit = handleSubmit(data => {
    createBoard(data)
      .then(() => {
        onClose()
        toast.success(t('pages.boards.add-board.success-info'))
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  })

  return (
    <Dialog
      onClose={onClose}
      {...rest}
      cancelButtonText={t('common.cancel')}
      confirmButtonDisabled={isPending}
      confirmButtonText={t('common.create')}
      title={t('pages.boards.add-board.title')}
    >
      <form className={'flex flex-col gap-4'} noValidate onSubmit={onSubmit}>
        <TextField
          {...register('title', {
            required: t('pages.boards.add-board.name-field.errors.required'),
          })}
          errorMessage={errors.title?.message}
          label={t('pages.boards.add-board.name-field.label')}
        />

        <Controller
          control={control}
          name={'editorIds'}
          render={({ field: { onChange, value } }) => (
            <UserMultiSelect
              className={'w-full'}
              errorMessage={errors.editorIds?.message}
              label={t('pages.boards.add-board.editors-select.label')}
              onChangeUserIds={onChange}
              userIds={value}
            />
          )}
        />

        {children}

        {import.meta.env.DEV && <DevTool control={control} />}
      </form>
    </Dialog>
  )
}
