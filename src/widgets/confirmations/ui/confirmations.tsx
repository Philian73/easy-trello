import { ReactNode, useState } from 'react'

import { ConfirmationParams, confirmationContext } from '@/shared/lib/confirmation'

import { defaultConfirmationParams } from '../model/constants'
import { ConfirmModalParams } from '../model/types'
import { ConfirmationModal } from './confirmation-modal'

export function Confirmations({ children }: { children?: ReactNode }) {
  const [modalParams, setModalParams] = useState<ConfirmModalParams>()

  const closeConfirmation = () => {
    modalParams?.onClose()
  }

  const getConfirmation = (params: ConfirmationParams) => {
    return new Promise<boolean>(res => {
      setModalParams({
        ...defaultConfirmationParams,
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
