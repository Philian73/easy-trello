import type { BoardPartial, UpdateBoardData } from '@/entities/board'

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { UserMultiSelect, UserSelect } from '@/entities/user'
import { Dialog, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'

import { useUpdateBoard } from '../../model/use-update-board'

type UpdateBoardModalProps = {
  board: BoardPartial
  /**
   * Cancel and confirm buttons from the "Dialog" component
   */
  children?: ReactNode
} & Omit<
  ComponentPropsWithoutRef<typeof Dialog>,
  'cancelButtonText' | 'children' | 'confirmButtonText' | 'title'
>

export const UpdateBoardModal: FC<UpdateBoardModalProps> = ({
  board,
  children,
  onClose,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
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

  const onSubmit = handleSubmit(data => updateBoard(data, onClose))

  return (
    <Dialog
      {...rest}
      cancelButtonText={'Отмена'}
      confirmButtonText={'Обновить'}
      onClose={onClose}
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
