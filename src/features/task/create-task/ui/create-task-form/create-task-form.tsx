import type { CreateTaskData } from '@/entities/task'

import type { ComponentPropsWithoutRef, FC } from 'react'
import { useForm } from 'react-hook-form'

import { Button, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'
import clsx from 'clsx'

import { useCreateTask } from '../../model/use-create-task'

type CreateTaskFormProps = Omit<ComponentPropsWithoutRef<'form'>, 'children' | 'onSubmit'>

export const CreateTaskForm: FC<CreateTaskFormProps> = ({ className, ...rest }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateTaskData>({
    defaultValues: {
      title: '',
    },
  })

  const { createTask } = useCreateTask()

  const onSubmit = handleSubmit(data => {
    createTask?.(data)
    reset()
  })

  return (
    <form className={clsx('flex gap-4', className)} noValidate {...rest} onSubmit={onSubmit}>
      <TextField
        errorMessage={errors.title?.message}
        fullWidth
        placeholder={'Название задачи'}
        {...register('title', { required: 'Название задачи - обязательное поле.' })}
      />

      <Button type={'submit'}>Создать</Button>

      {import.meta.env.DEV && <DevTool control={control} />}
    </form>
  )
}
