import type { ComponentPropsWithoutRef, FC } from 'react'

import { Icons } from '@/shared/assets/icons'

import { useRemoveUser } from '../../model/use-remove-user'

type RemoveUserButtonProps = {
  userId: string
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const RemoveUserButton: FC<RemoveUserButtonProps> = ({ userId, ...rest }) => {
  const { isPending, removeUser } = useRemoveUser()

  if (isPending) {
    return <Icons.Spinner className={'w-8 h-8 text-rose-500'} />
  }

  return (
    <button {...rest} onClick={() => removeUser(userId)}>
      <Icons.TrashOutlined className={'w-8 h-8 text-rose-500'} />
    </button>
  )
}
