import type { User } from '@/entities/user'

import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { Button } from '@/shared/ui'

import { useSignInUser } from '../../model/use-sign-in-user'

type SignInButtonProps = {
  user: User
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const SignInButton = forwardRef<HTMLButtonElement, SignInButtonProps>(
  ({ user, ...rest }, ref) => {
    const signInUser = useSignInUser()

    return (
      <Button ref={ref} {...rest} onClick={() => signInUser(user)}>
        Войти как
      </Button>
    )
  }
)

// ==============================================================================

if (import.meta.env.DEV) {
  SignInButton.displayName = 'SignInButton'
}

// ==============================================================================
