import type { UpdateBoardAccessData } from '../../model/types'

import type { FC, ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { UserMultiSelect, UserSelect } from '@/entities/user'
import { Dialog, type DialogProps } from '@/shared/ui'
import { DevTool } from '@hookform/devtools'

import { useManageBoardAccessDeps } from '../../deps'
import { useUpdateBoardAccess } from '../../model/use-update-board-access'

type UpdateBoardAccessModalProps = {
  /**
   * Cancel and confirm buttons from the "Dialog" component
   */
  children?: ReactNode
} & Omit<
  DialogProps,
  'cancelButtonText' | 'children' | 'confirmButtonDisabled' | 'confirmButtonText' | 'title'
>

export const UpdateBoardAccessModal: FC<UpdateBoardAccessModalProps> = ({
  children,
  onClose,
  ...rest
}) => {
  const { t } = useTranslation()

  const { boardAccessInfo } = useManageBoardAccessDeps()

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<UpdateBoardAccessData>({
    defaultValues: {
      editorIds: boardAccessInfo.editorIds ?? [],
      ownerId: boardAccessInfo.ownerId ?? '',
    },
  })

  const { updateBoard } = useUpdateBoardAccess(boardAccessInfo.id, onClose)

  return (
    <Dialog
      onClose={onClose}
      {...rest}
      cancelButtonText={t('common.cancel')}
      confirmButtonDisabled={!isDirty}
      confirmButtonText={t('common.update')}
      title={t('pages.board.access.update.title')}
    >
      <form className={'flex flex-col gap-4'} noValidate onSubmit={handleSubmit(updateBoard)}>
        <Controller
          control={control}
          name={'ownerId'}
          render={({ field: { onChange, value } }) => (
            <UserSelect
              className={'w-full'}
              errorMessage={errors.ownerId?.message}
              label={t('common.admin')}
              onChangeUserId={onChange}
              required
              userId={value}
            />
          )}
          rules={{
            required: true,
          }}
        />

        <Controller
          control={control}
          name={'editorIds'}
          render={({ field: { onChange, value } }) => (
            <UserMultiSelect
              className={'w-full'}
              errorMessage={errors.editorIds?.message}
              label={t('common.editors')}
              onChangeUserIds={onChange}
              userIds={value ?? []}
            />
          )}
        />

        {children}

        {import.meta.env.DEV && <DevTool control={control} />}
      </form>
    </Dialog>
  )
}
