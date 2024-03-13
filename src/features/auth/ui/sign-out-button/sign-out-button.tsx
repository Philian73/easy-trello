import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { Button } from '@/shared/ui'

import { useSignOut } from '../../model/use-sign-out'

type SignOutButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const SignOutButton = forwardRef<HTMLButtonElement, SignOutButtonProps>((props, ref) => {
  const signOut = useSignOut()

  return (
    <Button ref={ref} {...props} onClick={signOut} variant={'secondary'}>
      Выйти
    </Button>
  )
})

// ==============================================================================

if (import.meta.env.DEV) {
  SignOutButton.displayName = 'SignOutButton'
}

// ==============================================================================
