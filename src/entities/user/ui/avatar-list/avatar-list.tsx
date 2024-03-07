import type { ComponentPropsWithoutRef, FC } from 'react'

import clsx from 'clsx'

import { getAvatarUrl } from '../../'

type AvatarListProps = {
  avatarIds: string[]
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const AvatarList: FC<AvatarListProps> = ({ avatarIds, className, ...rest }) => {
  return (
    <div className={clsx('flex', className)} {...rest}>
      {avatarIds.map(id => (
        <img
          alt={`Avatar №${id}`}
          className={'-mr-2 last:mr-0 w-8 h-8'}
          key={id}
          src={getAvatarUrl(id)}
        />
      ))}
    </div>
  )
}
