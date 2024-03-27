import type { CreateUserFormData } from '../../model/types'

import type { ComponentPropsWithoutRef, FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { getAvatarUrl, useCreateUserMutation } from '@/entities/user'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Button, ImageSelect, TextField } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'
import clsx from 'clsx'

import { RoleSelect } from '../role-select/role-select'

type CreateUserFormProps = Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const CreateUserForm: FC<CreateUserFormProps> = ({ className, ...rest }) => {
  const { t } = useTranslation()

  const { isPending, mutateAsync: createUser } = useCreateUserMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CreateUserFormData>({
    defaultValues: {
      avatarId: '',
      email: '',
      name: '',
      password: '',
      role: 'user',
    },
  })

  const onSubmit = handleSubmit(data => {
    createUser(data)
      .then(() => {
        reset()
        toast.success(t('pages.users.add-user-form.success-info', { name: data.name }))
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
      <div className={'grid gap-2 grid-cols-2'}>
        <TextField
          errorMessage={errors.email?.message}
          label={t('pages.users.add-user-form.email-field.label')}
          placeholder={'example@ex.com'}
          type={'email'}
          {...register('email', {
            required: t('pages.users.add-user-form.email-field.errors.required'),
          })}
        />

        <TextField
          errorMessage={errors.password?.message}
          label={t('pages.users.add-user-form.password-field.label')}
          placeholder={'*****'}
          type={'password'}
          {...register('password', {
            required: t('pages.users.add-user-form.password-field.errors.required'),
          })}
        />

        <TextField
          errorMessage={errors.name?.message}
          label={t('pages.users.add-user-form.name-field.label')}
          {...register('name', {
            required: t('pages.users.add-user-form.name-field.errors.required'),
          })}
        />

        <Controller
          control={control}
          name={'role'}
          render={({ field: { onChange, value } }) => (
            <RoleSelect
              errorMessage={errors.role?.message}
              label={t('pages.users.add-user-form.role-select.label')}
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
            label={t('pages.users.add-user-form.avatar-select.label')}
            onChange={onChange}
            value={value}
          />
        )}
        rules={{ required: t('pages.users.add-user-form.avatar-select.errors.required') }}
      />

      <Button disabled={isPending} type={'submit'}>
        {t('pages.users.add-user-form.submit-button')}
      </Button>

      {import.meta.env.DEV && <DevTool control={control} />}
    </form>
  )
}
