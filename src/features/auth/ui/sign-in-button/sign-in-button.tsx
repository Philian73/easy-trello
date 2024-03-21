import type { UserDto } from '@/shared/api'

import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { toast } from 'react-toastify'

import { useLoginMutation } from '@/entities/session'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

type SignInButtonProps = {
  user: UserDto
} & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'disabled' | 'onClick'>

export const SignInButton = forwardRef<HTMLButtonElement, SignInButtonProps>(
  ({ user, ...rest }, ref) => {
    const { isPending, mutate: signInUser } = useLoginMutation()

    const handleSignInUser = () => {
      try {
        signInUser(user)
        toast.success('Авторизация прошла успешно.')
      } catch (error) {
        handleErrorResponse(error, toast.error)
      }
    }

    return (
      <Button disabled={isPending} ref={ref} {...rest} onClick={handleSignInUser}>
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
