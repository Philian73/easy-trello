import type { ComponentPropsWithoutRef, FC } from 'react'

import { AvatarList } from '@/entities/user'
import clsx from 'clsx'

import { useBoardEditors } from '../../model/use-board-editors'

type BoardEditorsProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const BoardEditors: FC<BoardEditorsProps> = ({ className, ...rest }) => {
  const { editors, owner } = useBoardEditors()

  if (editors.length === 0 && !owner) {
    return null
  }

  return (
    <div className={clsx('flex gap-2 items-center', className)} {...rest}>
      <span>Администратор: </span>
      <AvatarList avatarIds={[owner]} />

      <span>Редакторы: </span>
      {editors.length > 0 ? <AvatarList avatarIds={editors} /> : <span>Редакторов нет.</span>}
    </div>
  )
}
