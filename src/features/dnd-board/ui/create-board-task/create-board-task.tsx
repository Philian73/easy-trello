import type { CreateBoardTaskData } from '@/entities/board'

import { type FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { handleErrorResponse } from '@/shared/lib/utils'
import { TextField } from '@/shared/ui'

import { useBoardStore } from '../../model/use-board-store'

type CreateBoardTaskProps = {
  cardId: string
}

export const CreateBoardTask: FC<CreateBoardTaskProps> = ({ cardId }) => {
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
        Добавить +
      </button>
    )
  }

  const onSubmit = handleSubmit(async data => {
    try {
      await createBoardTask(cardId, data)
      reset()
      toast.success('Задача успешно создана.')
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  })

  return (
    <form noValidate onSubmit={onSubmit}>
      <TextField
        autoFocus
        errorMessage={errors.title?.message}
        placeholder={'Новая задача'}
        {...register('title', {
          onBlur: () => setCreate(false),
          required: 'Название задачи - обязательное поле.',
        })}
      />
    </form>
  )
}
