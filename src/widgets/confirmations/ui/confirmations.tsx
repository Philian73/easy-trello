import type { ConfirmModalParams } from '../model/types'

import { type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { type ConfirmationParams, confirmationContext } from '@/shared/lib/confirmation'

import { ConfirmationModal } from './confirmation-modal'

export function Confirmations({ children }: { children?: ReactNode }) {
  const { t } = useTranslation()

  const [modalParams, setModalParams] = useState<ConfirmModalParams>()

  const closeConfirmation = () => {
    modalParams?.onClose()
  }

  const getConfirmation = (params: ConfirmationParams) => {
    return new Promise<boolean>(res => {
      setModalParams({
        cancelText: t('confirmations.cancel-button'),
        confirmText: t('confirmations.confirm-button'),
        description: t('confirmations.description'),
        title: t('confirmations.title'),
        ...params,
        onClose: () => {
          closeConfirmation()
          setModalParams(undefined)
          res(false)
        },
        onConfirm: () => {
          setModalParams(undefined)
          res(true)
        },
      })
    })
  }

  return (
    <confirmationContext.Provider
      value={{
        closeConfirmation,
        getConfirmation,
      }}
    >
      {children}

      {modalParams && <ConfirmationModal open params={modalParams} />}
    </confirmationContext.Provider>
  )
}
