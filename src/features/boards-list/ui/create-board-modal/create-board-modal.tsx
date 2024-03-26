import type { CreateBoardFormData } from '../../model/types'

import type { FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
        toast.success('Доска успешно создана.')
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  })

  return (
    <Dialog
      onClose={onClose}
      {...rest}
      cancelButtonText={'Отмена'}
      confirmButtonDisabled={isPending}
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
          name={'editorIds'}
          render={({ field: { onChange, value } }) => (
            <UserMultiSelect
              className={'w-full'}
              errorMessage={errors.editorIds?.message}
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
