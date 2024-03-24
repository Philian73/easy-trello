import type { CreateUserFormData } from '../../model/types'

import type { ComponentPropsWithoutRef, FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { getAvatarUrl, useCreateUserMutation } from '@/entities/user'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Button, ImageSelect, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'
import clsx from 'clsx'

import { RoleSelect } from '../role-select/role-select'

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
      avatarId: '1',
      email: '',
      name: '',
      password: '',
      role: 'user',
    },
  })

  const onSubmit = handleSubmit(data => {
    createUser(data, {
      onError: error => {
        handleErrorResponse(error, toast.error)
      },
      onSuccess: () => {
        reset()
        toast.success('Пользователь успешно создан.')
      },
    })
  })

  return (
    <form
      className={clsx('flex flex-col gap-4', className)}
      noValidate
      {...rest}
      onSubmit={onSubmit}
    >
      <div className={'grid gap-2 grid-cols-2'}>
        <TextField
          errorMessage={errors.email?.message}
          label={'Email'}
          placeholder={'example@ex.com'}
          type={'email'}
          {...register('email', { required: 'Email пользователя - обязательное поле.' })}
        />

        <TextField
          errorMessage={errors.password?.message}
          label={'Пароль'}
          placeholder={'*****'}
          type={'password'}
          {...register('password', { required: 'Пароль пользователя - обязательное поле.' })}
        />

        <TextField
          errorMessage={errors.name?.message}
          label={'Имя нового пользователя'}
          {...register('name', { required: 'Имя пользователя - обязательное поле.' })}
        />

        <Controller
          control={control}
          name={'role'}
          render={({ field: { onChange, value } }) => (
            <RoleSelect
              errorMessage={errors.role?.message}
              label={'Роль пользователя'}
              onChangeRole={onChange}
              role={value}
            />
          )}
          rules={{ required: true }}
        />
      </div>

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
