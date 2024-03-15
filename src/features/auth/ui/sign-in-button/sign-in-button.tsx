import type { User } from '@/entities/user'

import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/shared/ui'

import { useSignIn } from '../../model/use-sign-in'

type SignInButtonProps = {
  user: User
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'onClick'>

export const SignInButton = forwardRef<HTMLButtonElement, SignInButtonProps>(
  ({ user, ...rest }, ref) => {
    const signInUser = useSignIn()

    const handleSignIn = async () => {
      await signInUser(user)
      toast.success('Авторизация прошла успешно.')
    }

    return (
      <Button ref={ref} {...rest} onClick={handleSignIn}>
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
