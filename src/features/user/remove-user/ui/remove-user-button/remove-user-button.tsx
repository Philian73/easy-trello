import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { Icons } from '@/shared/assets/icons'

import { useRemoveUser } from '../../model/use-remove-user'

type RemoveUserButtonProps = {
  userId: string
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const RemoveUserButton = forwardRef<HTMLButtonElement, RemoveUserButtonProps>(
  ({ userId, ...rest }, ref) => {
    const removeUser = useRemoveUser()

    return (
      <button {...rest} onClick={() => removeUser(userId)} ref={ref}>
        <Icons.TrashOutlined className={'w-8 h-8 text-rose-500'} />
      </button>
    )
  }
)

// ==============================================================================

if (import.meta.env.DEV) {
  RemoveUserButton.displayName = 'RemoveUserButton'
}

// ==============================================================================
