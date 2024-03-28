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
    setValue,
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
        toast.success(t('pages.sign-in.success-info'))
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
      <div className={'flex flex-col items-start'}>
        <span>{t('pages.sign-in.testing-data.text')}:</span>
        <div>
          <span>{t('pages.sign-in.email-field.label')}: </span>
          <span>admin@gmail.com</span>
        </div>
        <div>
          <span>{t('pages.sign-in.password-field.label')}: </span>
          <span>admin</span>
        </div>
        <button
          className={'font-medium text-blue-600 dark:text-blue-500 hover:underline'}
          onClick={() => {
            setValue('email', 'admin@gmail.com')
            setValue('password', 'admin')
          }}
          type={'button'}
        >
          {t('pages.sign-in.testing-data.button')}
        </button>
      </div>

      <TextField
        errorMessage={errors.email?.message}
        label={t('pages.sign-in.email-field.label')}
        placeholder={'example@ex.com'}
        type={'email'}
        {...register('email', { required: t('pages.sign-in.email-field.errors.required') })}
      />

      <TextField
        errorMessage={errors.password?.message}
        label={t('pages.sign-in.password-field.label')}
        placeholder={'*****'}
        type={'password'}
        {...register('password', { required: t('pages.sign-in.password-field.errors.required') })}
      />

      <Button disabled={isPending} type={'submit'}>
        {t('pages.sign-in.submit-button')}
      </Button>

      {import.meta.env.DEV && <DevTool control={control} />}
    </form>
  )
}
