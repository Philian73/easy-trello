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
    signOut(undefined, {
      onError: error => {
        handleErrorResponse(error, toast.error)
      },
    })
  }

  return (
    <Button ref={ref} variant={'outlined'} {...props} disabled={isPending} onClick={handleSignOut}>
      Выйти
    </Button>
  )
})

// ==============================================================================

if (import.meta.env.DEV) {
  SignOutButton.displayName = 'SignOutButton'
}

// ==============================================================================
