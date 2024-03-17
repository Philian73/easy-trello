import type { CreateBoardCardData } from '@/entities/board'

import type { FC, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { handleErrorResponse } from '@/shared/lib/utils'
import { Dialog, type DialogProps, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'

import { useBoardStore } from '../../model/use-board-store'

type CreateBoardCardModalProps = {
  /**
   * Cancel and confirm buttons from the "Dialog" component
   */
  children?: ReactNode
} & Omit<DialogProps, 'cancelButtonText' | 'children' | 'confirmButtonText' | 'title'>

export const CreateBoardCardModal: FC<CreateBoardCardModalProps> = ({
  children,
  onClose,
  ...rest
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<CreateBoardCardData>({
    defaultValues: {
      title: '',
    },
  })
  const createBoardCard = useBoardStore().useSelector(state => state.createBoardCard)

  const onSubmit = handleSubmit(async data => {
    try {
      await createBoardCard(data)
      onClose()
      toast.success('Карточка успешно создана.')
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
      title={'Создание карточки'}
    >
      <form className={'flex flex-col grow'} noValidate onSubmit={onSubmit}>
        <TextField
          errorMessage={errors.title?.message}
          label={'Название'}
          {...register('title', { required: 'Название карточки - обязательное поле.' })}
        />

        {children}

        {import.meta.env.DEV && <DevTool control={control} />}
      </form>
    </Dialog>
  )
}
