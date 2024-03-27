import type { CreateBoardCardData } from '../../model/types'

import type { FC, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()

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

  const onSubmit = handleSubmit(data => {
    createBoardCard(data)
      .then(() => {
        onClose()
        toast.success(t('pages.board.cards.add.success-info', { title: data.title }))
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
      confirmButtonText={t('common.create')}
      title={t('pages.board.cards.add.title')}
    >
      <form className={'flex flex-col grow'} noValidate onSubmit={onSubmit}>
        <TextField
          errorMessage={errors.title?.message}
          label={t('pages.board.cards.add.name-field.label')}
          {...register('title', {
            required: t('pages.board.cards.add.name-field.errors.required'),
          })}
        />

        {children}

        {import.meta.env.DEV && <DevTool control={control} />}
      </form>
    </Dialog>
  )
}
