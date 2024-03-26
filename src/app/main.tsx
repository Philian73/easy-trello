import { Bounce, ToastContainer } from 'react-toastify'

import { createRoot } from 'react-dom/client'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import '@/shared/lib/i18n'

import { App } from './app'

import('@/shared/api/msw')
  .then(({ worker }) => worker.start())
  .then(() => {
    createRoot(document.getElementById('root')!).render(
      <>
        <App />
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
          transition={Bounce}
        />
      </>
    )
  })
