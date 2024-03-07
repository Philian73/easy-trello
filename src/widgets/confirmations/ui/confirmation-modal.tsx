import { Dialog } from '@/shared/ui'

import { ConfirmModalParams } from '../model/types'

export function ConfirmationModal({ open, params }: { open: boolean; params: ConfirmModalParams }) {
  const { cancelText, confirmText, description, onClose, onConfirm, title } = params

  return (
    <Dialog
      cancelButtonText={cancelText}
      confirmButtonText={confirmText}
      onClose={onClose}
      onConfirmButtonClick={onConfirm}
      open={open}
      title={title}
    >
      {description}
    </Dialog>
  )
}
