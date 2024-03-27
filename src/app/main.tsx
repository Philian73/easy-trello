import { initializeWorker } from '@/shared/api'
import { createRoot } from 'react-dom/client'

import './index.css'
import '@/shared/lib/i18n'
import 'react-toastify/dist/ReactToastify.css'

import { App } from './app'

initializeWorker()
  .then(worker => worker.start())
  .then(() => {
    createRoot(document.getElementById('root')!).render(<App />)
  })
