import type { CreateBoardData } from '@/entities/board'

import type { ComponentPropsWithoutRef, FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { UserMultiSelect } from '@/entities/user'
import { Dialog, TextField } from '@/shared/ui'

import { useCreateBoard } from '../../model/use-create-board'

type CreateBoardModalProps = Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children'>

export const CreateBoardModal: FC<CreateBoardModalProps> = ({ onClose, ...rest }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateBoardData>({
    defaultValues: {
      editorsIds: [],
      name: '',
    },
  })

  const { createBoard } = useCreateBoard()

  const onSubmit = handleSubmit(data => createBoard(data, onClose))

  return (
    <Dialog
      confirmButtonText={'Создать'}
      onClose={onClose}
      onConfirmButtonClick={onSubmit}
      title={'Создание доски'}
      width={'md'}
      {...rest}
    >
      <form className={'flex flex-col gap-4'} method={'post'} noValidate onSubmit={onSubmit}>
        <TextField
          {...register('name', { required: 'Название доски - обязательное поле.' })}
          errorMessage={errors.name?.message}
          label={'Название'}
        />

        <Controller
          control={control}
          name={'editorsIds'}
          render={({ field: { onChange, value } }) => (
            <UserMultiSelect
              className={'w-full'}
              errorMessage={errors.editorsIds?.message}
              label={'Выберите редакторов'}
              onChangeUserIds={onChange}
              userIds={value}
            />
          )}
        />
      </form>
    </Dialog>
  )
}
