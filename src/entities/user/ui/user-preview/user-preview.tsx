import type { ComponentPropsWithoutRef, FC } from 'react'

import clsx from 'clsx'

import { getAvatarUrl } from '../../'

type UserPreviewProps = {
  avatarId: string
  name: string
  size: 'lg' | 'md' | 'sm'
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const UserPreview: FC<UserPreviewProps> = ({ avatarId, className, name, size, ...rest }) => {
  return (
    <div className={clsx(className, 'flex gap-2 items-center')} {...rest}>
      <img
        alt={`Avatar №${avatarId}`}
        className={{ lg: 'w-12 h-12', md: 'w-10 h-10', sm: 'w-8 h-8' }[size]}
        src={getAvatarUrl(avatarId)}
      />
      <div
        className={clsx(
          { lg: 'text-xl', md: 'text-lg', sm: 'text-lg' }[size],
          'whitespace-nowrap overflow-hidden text-ellipsis min-w-[50px]'
        )}
      >
        {name}
      </div>
    </div>
  )
}
