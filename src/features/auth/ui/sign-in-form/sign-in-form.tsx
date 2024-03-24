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
    setError,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { isPending, mutate: signIn } = useLoginMutation()

  const onSubmit = handleSubmit(data => {
    signIn(data, {
      onError: error => {
        setError('root', error)
        handleErrorResponse(error, toast.error)
      },
      onSuccess: () => {
        toast.success('Авторизация прошла успешно.')
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

      {errors.root?.message && <span className={'text-red-500'}>{errors.root.message}</span>}

      <Button disabled={isPending} type={'submit'}>
        Войти
      </Button>

      {import.meta.env.DEV && <DevTool control={control} />}
    </form>
  )
}
