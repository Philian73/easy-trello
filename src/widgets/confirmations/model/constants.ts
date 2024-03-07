import { ConfirmModalParams } from './types'

export const defaultConfirmationParams: ConfirmModalParams = {
  cancelText: 'Отмена',
  confirmText: 'Подтвердить',
  description: 'Вы уверены что хотите продолжить?',
  onClose: () => {},
  onConfirm: () => {},
  title: 'Подтвердите действие',
}
