import { createStrictContext, useStrictContext } from '@/shared/lib/hooks'

export type ConfirmationParams = {
  cancelText?: string
  confirmText?: string
  description?: string
  title?: string
}

export type ConfirmationContext = {
  closeConfirmation: () => void
  getConfirmation: (params: ConfirmationParams) => Promise<boolean>
}

export const confirmationContext = createStrictContext<ConfirmationContext>()

export const useGetConfirmation = () => {
  const { getConfirmation } = useStrictContext(confirmationContext)

  return getConfirmation
}
