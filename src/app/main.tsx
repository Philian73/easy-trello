import { Bounce, ToastContainer } from 'react-toastify'

import { createRoot } from 'react-dom/client'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import { App } from './app'

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
