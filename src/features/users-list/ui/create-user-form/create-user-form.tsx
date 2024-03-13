import type { ComponentPropsWithoutRef, FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { getAvatarUrl } from '@/entities/user'
import { Button, ImageSelect, TextField } from '@/shared/ui'
import clsx from 'clsx'

import { type CreateUserFormData, useCreateUser } from '../../model/use-create-user'

type CreateUserFormProps = Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const CreateUserForm: FC<CreateUserFormProps> = ({ className, ...rest }) => {
  const createUser = useCreateUser()

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

  return (
    <form
      className={clsx('flex flex-col gap-4', className)}
      noValidate
      {...rest}
      onSubmit={handleSubmit(data => {
        createUser(data)
        reset()
      })}
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

      <Button type={'submit'}>Создать</Button>
    </form>
  )
}
