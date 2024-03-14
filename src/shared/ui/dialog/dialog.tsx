import { type FC, cloneElement, isValidElement } from 'react'

import { Button, Modal, type ModalProps } from '@/shared/ui'

type DialogProps = {
  cancelButtonText?: string
  confirmButtonDisabled?: boolean
  confirmButtonText?: string
  onConfirmButtonClick?: () => void
} & ModalProps

export const Dialog: FC<DialogProps> = ({
  cancelButtonText,
  children,
  confirmButtonDisabled = false,
  confirmButtonText,
  onClose,
  onConfirmButtonClick,
  ...rest
}) => {
  const showCancelButton = !!cancelButtonText && cancelButtonText?.length > 0
  const showConfirmButton = !!confirmButtonText && confirmButtonText?.length > 0

  const buttonsBlock = (
    <div className={'mt-auto pt-4 flex gap-4 justify-end'}>
      {showCancelButton && (
        <Button onClick={onClose} type={'button'} variant={'outlined'}>
          {cancelButtonText}
        </Button>
      )}
      {showConfirmButton && (
        <Button disabled={confirmButtonDisabled} onClick={onConfirmButtonClick}>
          {confirmButtonText}
        </Button>
      )}
    </div>
  )

  return (
    <Modal onClose={onClose} {...rest}>
      {isValidElement(children) ? (
        cloneElement(
          children,
          {},
          <>
            {children.props.children}
            {buttonsBlock}
          </>
        )
      ) : (
        <>
          {children}
          {buttonsBlock}
        </>
      )}
    </Modal>
  )
}
