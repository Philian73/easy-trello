import type { BoardPartial, UpdateBoardData } from '@/entities/board'

import type { FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { UserMultiSelect, UserSelect } from '@/entities/user'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Dialog, type DialogProps, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'

import { useUpdateBoard } from '../../model/use-update-board'

type UpdateBoardModalProps = {
  board: BoardPartial
  /**
   * Cancel and confirm buttons from the "Dialog" component
   */
  children?: ReactNode
} & Omit<DialogProps, 'cancelButtonText' | 'confirmButtonDisabled' | 'confirmButtonText' | 'title'>

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
  } = useForm<UpdateBoardData>({
    defaultValues: {
      editorsIds: board.editorsIds ?? [],
      ownerId: board.ownerId ?? '',
      title: board.title ?? '',
    },
  })

  const { updateBoard } = useUpdateBoard(board)

  const onSubmit = handleSubmit(async data => {
    try {
      await updateBoard(data, onClose)
      toast.success('Доска успешно обновлена.')
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
      title={'Редактирование доски'}
    >
      <form className={'flex flex-col gap-4'} noValidate onSubmit={onSubmit}>
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
          name={'editorsIds'}
          render={({ field: { onChange, value } }) => (
            <UserMultiSelect
              className={'w-full'}
              errorMessage={errors.editorsIds?.message}
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
