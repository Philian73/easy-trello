import type { CreateBoardData } from '@/entities/board'

import type { FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { UserMultiSelect } from '@/entities/user'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Dialog, type DialogProps, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'

import { useCreateBoard } from '../../model/use-create-board'

type CreateBoardModalProps = {
  /**
   * Cancel and confirm buttons from the "Dialog" component
   */
  children?: ReactNode
} & Omit<DialogProps, 'cancelButtonText' | 'children' | 'confirmButtonText' | 'title'>

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

  const onSubmit = handleSubmit(async data => {
    try {
      await createBoard(data, onClose)
      toast.success('Доска успешно создана.')
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  })

  return (
    <Dialog
      onClose={onClose}
      {...rest}
      cancelButtonText={'Отмена'}
      confirmButtonText={'Создать'}
      title={'Создание доски'}
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
