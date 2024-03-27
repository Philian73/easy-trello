import { createRoot } from 'react-dom/client'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import '@/shared/lib/i18n'

import { App } from './app'

import('@/shared/api/msw')
  .then(({ worker }) => worker.start())
  .then(() => {
    createRoot(document.getElementById('root')!).render(<App />)
  })
