import type { FC, ReactNode } from 'react'

import { Button, Modal, type ModalProps } from '@/shared/ui'

type DialogProps = {
  cancelButtonText?: string
  children: ReactNode
  confirmButtonText?: string
  onConfirmButtonClick?: () => void
} & ModalProps

export const Dialog: FC<DialogProps> = ({
  cancelButtonText,
  children,
  confirmButtonText,
  onClose,
  onConfirmButtonClick,
  ...rest
}) => {
  const showCancelButton = !!cancelButtonText && cancelButtonText?.length > 0
  const showConfirmButton = !!confirmButtonText && confirmButtonText?.length > 0

  return (
    <Modal onClose={onClose} {...rest}>
      {children}

      <div className={'mt-auto py-4 flex gap-4 justify-end'}>
        {showCancelButton && (
          <Button onClick={onClose} type={'button'} variant={'outlined'}>
            {cancelButtonText}
          </Button>
        )}
        {showConfirmButton && (
          <Button onClick={onConfirmButtonClick} type={'submit'}>
            {confirmButtonText}
          </Button>
        )}
      </div>
    </Modal>
  )
}
