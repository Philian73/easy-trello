import type { CreateBoardTaskData } from '../../model/types'

import { type FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { handleErrorResponse } from '@/shared/lib/utils'
import { TextField } from '@/shared/ui'

import { useBoardStore } from '../../model/use-board-store'

type CreateBoardTaskProps = {
  cardId: string
}

export const CreateBoardTask: FC<CreateBoardTaskProps> = ({ cardId }) => {
  const { t } = useTranslation()

  const [create, setCreate] = useState(false)

  const createBoardTask = useBoardStore().useSelector(state => state.createBoardTask)

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateBoardTaskData>({
    defaultValues: {
      title: '',
    },
  })

  if (!create) {
    return (
      <button
        className={'h-10 p-2 hover:bg-teal-100/40 rounded flex items-center justify-center w-full'}
        onClick={() => setCreate(true)}
        type={'button'}
      >
        {t('pages.board.tasks.add.button')}
      </button>
    )
  }

  const onSubmit = handleSubmit(({ title }) => {
    createBoardTask(cardId, { title: title.trim() })
      .then(() => {
        reset()
        toast.success(t('pages.board.tasks.add.success-info', { title }))
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  })

  return (
    <form noValidate onSubmit={onSubmit}>
      <TextField
        autoFocus
        errorMessage={errors.title?.message}
        placeholder={t('pages.board.tasks.add.placeholder')}
        {...register('title', {
          onBlur: () => setCreate(false),
          validate: str => {
            if (str.trim().length === 0) {
              return t('pages.board.tasks.add.error')
            }
          },
        })}
      />
    </form>
  )
}
