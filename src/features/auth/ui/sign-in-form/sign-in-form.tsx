import type { SignInFormData } from '../../model/types'

import type { ComponentPropsWithoutRef, FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useLoginMutation } from '@/entities/session'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Button, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'
import clsx from 'clsx'

type SignInForm = Omit<ComponentPropsWithoutRef<'form'>, 'children' | 'onSubmit'>

export const SignInForm: FC<SignInForm> = ({ className, ...rest }) => {
  const { t } = useTranslation()

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
        toast.success(t('pages.sign_in.success_info'))
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
        label={t('pages.sign_in.email_field.label')}
        placeholder={'example@ex.com'}
        type={'email'}
        {...register('email', { required: t('pages.sign_in.email_field.errors.required') })}
      />

      <TextField
        errorMessage={errors.password?.message}
        label={t('pages.sign_in.password_field.label')}
        placeholder={'*****'}
        type={'password'}
        {...register('password', { required: t('pages.sign_in.password_field.errors.required') })}
      />

      <Button disabled={isPending} type={'submit'}>
        {t('pages.sign_in.submit_button')}
      </Button>

      {import.meta.env.DEV && <DevTool control={control} />}
    </form>
  )
}
