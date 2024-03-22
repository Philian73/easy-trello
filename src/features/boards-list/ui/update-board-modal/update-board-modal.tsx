import type { BoardPartial, UpdateBoardFormData } from '../../model/types'

import type { FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'

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
      cancelButtonText={'Отмена'}
      confirmButtonDisabled={!isDirty || isPending}
      confirmButtonText={'Обновить'}
      title={'Редактирование доски'}
    >
      <form className={'flex flex-col gap-4'} noValidate onSubmit={handleSubmit(updateBoard)}>
        <TextField
          errorMessage={errors.title?.message}
          label={'Название'}
          {...register('title', { required: 'Название доски - обязательное поле' })}
        />

        <Controller
          control={control}
          name={'ownerId'}
          render={({ field: { onChange, value } }) => (
            <UserSelect
              className={'w-full'}
              errorMessage={errors.ownerId?.message}
              label={'Администратор'}
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
              label={'Редакторы'}
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
