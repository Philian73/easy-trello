import type { SignInFormData } from '../../model/types'

import type { ComponentPropsWithoutRef, FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useLoginMutation } from '@/entities/session'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Button, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'
import clsx from 'clsx'

type SignInForm = Omit<ComponentPropsWithoutRef<'form'>, 'children' | 'onSubmit'>

export const SignInForm: FC<SignInForm> = ({ className, ...rest }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { isPending, mutateAsync: signIn } = useLoginMutation()

  const onSubmit = handleSubmit(data => {
    signIn(data)
      .then(() => {
        toast.success('Авторизация прошла успешно.')
      })
      .catch(error => {
        handleErrorResponse(error, toast.error)
      })
  })

  return (
    <form
      className={clsx('flex flex-col gap-4', className)}
      noValidate
      {...rest}
      onSubmit={onSubmit}
    >
      <TextField
        errorMessage={errors.email?.message}
        label={'Email'}
        placeholder={'example@ex.com'}
        type={'email'}
        {...register('email', { required: 'Email - обязательное поле.' })}
      />

      <TextField
        errorMessage={errors.password?.message}
        label={'Пароль'}
        placeholder={'*****'}
        type={'password'}
        {...register('password', { required: 'Пароль - обязательное поле.' })}
      />

      <Button disabled={isPending} type={'submit'}>
        Войти
      </Button>

      {import.meta.env.DEV && <DevTool control={control} />}
    </form>
  )
}
