import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { useRemoveUser } from '@/features/user/model/use-remove-user'
import { Icons } from '@/shared/assets/icons'
import clsx from 'clsx'

type RemoveUserButtonProps = {
  userId: string
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const RemoveUserButton = forwardRef<HTMLButtonElement, RemoveUserButtonProps>(
  ({ className, userId, ...rest }, ref) => {
    const removeUser = useRemoveUser()

    return (
      <button
        className={clsx('px-1', className)}
        {...rest}
        onClick={() => removeUser(userId)}
        ref={ref}
      >
        <Icons.TrashOutlined className={'w-8 h-8 text-rose-500'} />
      </button>
    )
  }
)
