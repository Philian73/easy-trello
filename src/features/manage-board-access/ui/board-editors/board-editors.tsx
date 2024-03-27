import type { ComponentPropsWithoutRef, FC } from 'react'
import { useTranslation } from 'react-i18next'

import { AvatarList, UserPreview } from '@/entities/user'
import clsx from 'clsx'

import { useBoardEditors } from '../../model/use-board-editors'

type BoardEditorsProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const BoardEditors: FC<BoardEditorsProps> = ({ className, ...rest }) => {
  const { t } = useTranslation()

  const { editors, owner } = useBoardEditors()

  if (editors.length === 0 && !owner) {
    return null
  }

  return (
    <div className={clsx('flex gap-2 items-center', className)} {...rest}>
      <span>{t('common.admin')}: </span>
      <UserPreview size={'md'} {...owner} />

      <span>{t('common.editors')}: </span>
      {editors.length > 0 ? (
        <AvatarList avatarIds={editors} />
      ) : (
        <span>{t('pages.board.access.empty-editors')}</span>
      )}
    </div>
  )
}
