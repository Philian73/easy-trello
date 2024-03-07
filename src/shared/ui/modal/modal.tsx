import type { FC, ReactNode } from 'react'

import { Icons } from '@/shared/assets/icons'
import { Dialog } from '@headlessui/react'
import clsx from 'clsx'

export type ModalProps = {
  children: ReactNode
  onClose: () => void
  open: boolean
  showCloseButton?: boolean
  title?: string
  width?: 'full' | 'md'
}

export const Modal: FC<ModalProps> = ({
  children,
  onClose,
  showCloseButton = true,
  width = 'md',
  ...rest
}) => {
  return (
    <Dialog className={'relative z-50'} onClose={onClose} {...rest}>
      <div aria-hidden={'true'} className={'fixed inset-0 bg-black/30'} />
      <div className={'fixed inset-0 bg-slate-900/60 backdrop-blur w-screen overflow-y-auto'}>
        <div className={'flex min-h-full items-center justify-center p-4'}>
          <Dialog.Panel
            className={clsx(
              'flex flex-col bg-white rounded-lg min-h-[320px] mx-auto relative px-6',
              {
                full: 'mx-5',
                md: 'max-w-[640px] w-full',
              }[width]
            )}
          >
            <div className={'pt-6 pb-4 text-2xl'}>
              <Dialog.Title>Deactivate account</Dialog.Title>
              {showCloseButton && (
                <button
                  className={
                    ' w-8 h-8 rounded  flex items-center justify-center hover:bg-white/40 bg-white/10 transition-colors absolute top-0 left-[calc(100%+12px)]'
                  }
                  onClick={onClose}
                >
                  <Icons.CrossLight className={'w-4 h-4 text-white'} />
                </button>
              )}
            </div>

            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
