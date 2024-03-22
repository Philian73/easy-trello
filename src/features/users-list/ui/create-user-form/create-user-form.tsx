import type { CreateUserFormData } from '../../model/types'

import type { ComponentPropsWithoutRef, FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { getAvatarUrl, useCreateUserMutation } from '@/entities/user'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Button, ImageSelect, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'
import clsx from 'clsx'

type CreateUserFormProps = Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const CreateUserForm: FC<CreateUserFormProps> = ({ className, ...rest }) => {
  const { isPending, mutate: createUser } = useCreateUserMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateUserFormData>({
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = handleSubmit(data => {
    try {
      createUser(data)
      reset()
      toast.success('Пользователь успешно создан.')
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  })

  return (
    <form
      className={clsx('flex flex-col gap-4', className)}
      noValidate
      {...rest}
      onSubmit={onSubmit}
    >
      <TextField
        {...register('name', { required: 'Имя пользователя - обязательное поле.' })}
        errorMessage={errors.name?.message}
        label={'Имя нового пользователя'}
      />

      <Controller
        control={control}
        name={'avatarId'}
        render={({ field: { onChange, value } }) => (
          <ImageSelect
            errorMessage={errors.avatarId?.message}
            getSrc={getAvatarUrl}
            images={Array.from({ length: 8 }, (_, i) => i + 1)}
            label={'Выберите аватар пользователя'}
            onChange={onChange}
            value={value}
          />
        )}
        rules={{ required: 'Аватар - обязательное поле' }}
      />

      <Button disabled={isPending} type={'submit'}>
        Создать
      </Button>

      {import.meta.env.DEV && <DevTool control={control} />}
    </form>
  )
}
