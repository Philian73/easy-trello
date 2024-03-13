import type { CreateBoardData } from '@/entities/board'

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { UserMultiSelect } from '@/entities/user'
import { Dialog, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'

import { useCreateBoard } from '../../model/use-create-board'

type CreateBoardModalProps = {
  /**
   * Cancel and confirm buttons from the "Dialog" component
   */
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof Dialog>, 'children'>

export const CreateBoardModal: FC<CreateBoardModalProps> = ({ children, onClose, ...rest }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateBoardData>({
    defaultValues: {
      editorsIds: [],
      title: '',
    },
  })

  const { createBoard } = useCreateBoard()

  const onSubmit = handleSubmit(data => createBoard(data, onClose))

  return (
    <Dialog
      cancelButtonText={'Отмена'}
      confirmButtonText={'Создать'}
      onClose={onClose}
      title={'Создание доски'}
      {...rest}
    >
      <form className={'flex flex-col gap-4'} noValidate onSubmit={onSubmit}>
        <TextField
          {...register('title', { required: 'Название доски - обязательное поле.' })}
          errorMessage={errors.title?.message}
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

        {children}

        {import.meta.env.DEV && <DevTool control={control} />}
      </form>
    </Dialog>
  )
}
