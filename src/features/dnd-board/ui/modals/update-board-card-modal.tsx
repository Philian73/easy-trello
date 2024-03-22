import type { BoardCard, UpdateBoardCardData } from '@/features/dnd-board/model/types'

import type { FC, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { handleErrorResponse } from '@/shared/lib/utils'
import { Dialog, type DialogProps, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'

import { useBoardStore } from '../../model/use-board-store'

type UpdateBoardCardModalProps = {
  /**
   * Cancel and confirm buttons from the "Dialog" component
   */
  card: BoardCard
  children?: ReactNode
} & Omit<
  DialogProps,
  'cancelButtonText' | 'children' | 'confirmButtonDisabled' | 'confirmButtonText' | 'title'
>

export const UpdateBoardCardModal: FC<UpdateBoardCardModalProps> = ({
  card,
  children,
  onClose,
  ...rest
}) => {
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm<UpdateBoardCardData>({
    defaultValues: {
      title: card.title ?? '',
    },
  })

  const updateBoardCard = useBoardStore().useSelector(state => state.updateBoardCard)

  const onSubmit = handleSubmit(async data => {
    try {
      await updateBoardCard(card.id, data)
      onClose()
      toast.success('Карточка успешно обновлена.')
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
      title={'Редактирование карточки'}
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
