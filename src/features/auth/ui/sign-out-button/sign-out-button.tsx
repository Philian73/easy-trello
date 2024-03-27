import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useLogoutMutation } from '@/entities/session'
import { handleErrorResponse } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

type SignOutButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children' | 'disabled' | 'onClick'
>

export const SignOutButton = forwardRef<HTMLButtonElement, SignOutButtonProps>((props, ref) => {
  const { t } = useTranslation()

  const { isPending, mutateAsync: signOut } = useLogoutMutation()

  const handleSignOut = () => {
    signOut().catch(error => {
      handleErrorResponse(error, toast.error)
    })
  }

  return (
    <Button ref={ref} variant={'outlined'} {...props} disabled={isPending} onClick={handleSignOut}>
      {t('common.sign-out-button')}
    </Button>
  )
})

// ==============================================================================

if (import.meta.env.DEV) {
  SignOutButton.displayName = 'SignOutButton'
}

// ==============================================================================
