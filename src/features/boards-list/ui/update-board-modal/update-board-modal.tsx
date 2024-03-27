import type { UpdateBoardFormData } from '../../model/types'
import type { BoardPartial } from '@/entities/board'

import type { FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { UserMultiSelect, UserSelect } from '@/entities/user'
import { Dialog, type DialogProps, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'

import { useUpdateBoard } from '../../model/use-update-board'

type UpdateBoardModalProps = {
  board: BoardPartial
  /**
   * Cancel and confirm buttons from the "Dialog" component
   */
  children?: ReactNode
} & Omit<
  DialogProps,
  'cancelButtonText' | 'children' | 'confirmButtonDisabled' | 'confirmButtonText' | 'title'
>

export const UpdateBoardModal: FC<UpdateBoardModalProps> = ({
  board,
  children,
  onClose,
  ...rest
}) => {
  const { t } = useTranslation()

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm<UpdateBoardFormData>({
    defaultValues: {
      editorIds: board.editorIds ?? [],
      ownerId: board.ownerId ?? '',
      title: board.title ?? '',
    },
  })
  const { isPending, updateBoard } = useUpdateBoard(board.id, onClose)

  return (
    <Dialog
      onClose={onClose}
      {...rest}
      cancelButtonText={t('common.cancel')}
      confirmButtonDisabled={!isDirty || isPending}
      confirmButtonText={t('common.update')}
      title={t('pages.boards.update-board.title', { title: board.title })}
    >
      <form className={'flex flex-col gap-4'} noValidate onSubmit={handleSubmit(updateBoard)}>
        <TextField
          errorMessage={errors.title?.message}
          label={t('common.name')}
          {...register('title', { required: 'Название доски - обязательное поле' })}
        />

        <Controller
          control={control}
          name={'ownerId'}
          render={({ field: { onChange, value } }) => (
            <UserSelect
              className={'w-full'}
              errorMessage={errors.ownerId?.message}
              label={t('common.admin')}
              onChangeUserId={onChange}
              required
              userId={value}
            />
          )}
          rules={{ required: 'Администратор доски - обязательное поле.' }}
        />

        <Controller
          control={control}
          name={'editorIds'}
          render={({ field: { onChange, value } }) => (
            <UserMultiSelect
              className={'w-full'}
              errorMessage={errors.editorIds?.message}
              label={t('common.editors')}
              onChangeUserIds={onChange}
              userIds={value ?? []}
            />
          )}
        />

        {children}

        {import.meta.env.DEV && <DevTool control={control} />}
      </form>
    </Dialog>
  )
}
