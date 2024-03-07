import { ComponentPropsWithoutRef, FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { UpdateBoardData, useBoards } from '@/entities/board'
import { UserMultiSelect, UserSelect } from '@/entities/user'
import { Dialog, TextField } from '@/shared/ui'

import { useUpdateBoard } from '../../model/use-update-board'

type UpdateBoardModalProps = {
  boardId: string
} & Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children'>

export const UpdateBoardModal: FC<UpdateBoardModalProps> = ({ boardId, onClose, ...rest }) => {
  const board = useBoards(state => state.getBoardById(boardId))

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UpdateBoardData>({
    defaultValues: board,
  })

  const { updateBoard } = useUpdateBoard(boardId)

  const onSubmit = handleSubmit(data => updateBoard(data, onClose))

  return (
    <Dialog
      cancelButtonText={'Отмена'}
      confirmButtonText={'Обновить'}
      onClose={onClose}
      onConfirmButtonClick={onSubmit}
      title={'Редактирование доски'}
      {...rest}
    >
      <form className={'flex flex-col gap-4'} noValidate onSubmit={onSubmit}>
        <TextField
          errorMessage={errors.name?.message}
          label={'Название'}
          {...register('name', { required: 'Название доски - обязательное поле' })}
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
      </form>
    </Dialog>
  )
}
