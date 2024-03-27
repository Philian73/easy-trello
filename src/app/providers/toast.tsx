import type { FC, PropsWithChildren } from 'react'
import { Bounce, ToastContainer } from 'react-toastify'

import { useTheme } from '@/shared/lib/theme'

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <>
      {children}
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable={false}
        hideProgressBar={false}
        newestOnTop
        pauseOnFocusLoss={false}
        pauseOnHover
        position={'bottom-right'}
        rtl={false}
        theme={theme}
        transition={Bounce}
      />
    </>
  )
}
