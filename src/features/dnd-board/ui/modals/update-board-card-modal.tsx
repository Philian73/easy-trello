import type { UpdateBoardCardData } from '../../model/types'
import type { BoardCard } from '@/entities/board'

import type { FC, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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

  const onSubmit = handleSubmit(data => {
    updateBoardCard(card.id, data)
      .then(() => {
        onClose()
        toast.success(t('pages.board.cards.update.success-info', { title: data.title }))
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  })

  return (
    <Dialog
      onClose={onClose}
      {...rest}
      cancelButtonText={t('common.cancel')}
      confirmButtonDisabled={!isDirty}
      confirmButtonText={t('common.update')}
      title={t('pages.board.cards.update.title', { title: card.title })}
    >
      <form className={'flex flex-col grow'} noValidate onSubmit={onSubmit}>
        <TextField
          errorMessage={errors.title?.message}
          label={t('common.name')}
          {...register('title', {
            required: t('pages.board.cards.update.name-field.errors.required'),
          })}
        />

        {children}

        {import.meta.env.DEV && <DevTool control={control} />}
      </form>
    </Dialog>
  )
}
