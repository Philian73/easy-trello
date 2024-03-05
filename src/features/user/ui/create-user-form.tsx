import type { ComponentPropsWithoutRef, FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { getAvatarUrl, useUsers } from '@/entities/user'
import { Button, ImageSelect, TextField } from '@/shared/ui'
import clsx from 'clsx'

export type CreateUserFormData = {
  avatarId: string
  name: string
}

type CreateUserFormProps = Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const CreateUserForm: FC<CreateUserFormProps> = ({ className, ...rest }) => {
  const { createUser } = useUsers()
  const { control, handleSubmit, reset } = useForm<CreateUserFormData>({
    defaultValues: {
      name: '',
    },
  })

  return (
    <form
      {...rest}
      className={clsx('flex flex-col gap-4', className)}
      method={'post'}
      noValidate
      onSubmit={handleSubmit(data => {
        createUser?.(data)
        reset()
      })}
    >
      <Controller
        control={control}
        name={'name'}
        render={({ field, fieldState }) => (
          <TextField
            errorMessage={fieldState.error?.message}
            label={'Имя нового пользователя'}
            {...field}
          />
        )}
        rules={{ required: 'Имя пользователя - обязательное поле' }}
      />

      <Controller
        control={control}
        name={'avatarId'}
        render={({ field, fieldState }) => (
          <ImageSelect
            errorMessage={fieldState.error?.message}
            getSrc={getAvatarUrl}
            images={Array.from({ length: 8 }, (_, i) => i + 1)}
            label={'Выберите аватар пользователя'}
            {...field}
          />
        )}
        rules={{ required: 'Аватар - обязательное поле' }}
      />

      <Button type={'submit'}>Создать</Button>
    </form>
  )
}
