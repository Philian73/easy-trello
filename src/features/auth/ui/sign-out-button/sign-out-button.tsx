import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { toast } from 'react-toastify'

import { useLogoutMutation } from '@/entities/session'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

type SignOutButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'disabled' | 'onClick'
>

export const SignOutButton = forwardRef<HTMLButtonElement, SignOutButtonProps>((props, ref) => {
  const { isPending, mutate: signOut } = useLogoutMutation()

  const handleSignOut = () => {
    try {
      signOut()
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  }

  return (
    <Button disabled={isPending} ref={ref} {...props} onClick={handleSignOut} variant={'secondary'}>
      Выйти
    </Button>
  )
})

// ==============================================================================

if (import.meta.env.DEV) {
  SignOutButton.displayName = 'SignOutButton'
}

// ==============================================================================
