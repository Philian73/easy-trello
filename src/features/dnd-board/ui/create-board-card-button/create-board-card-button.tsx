import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui'

import { CreateBoardCardModal } from '../modals/create-board-card-modal'

export const CreateBoardCardButton = () => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>{t('pages.board.add-card-button')}</Button>
      {open && <CreateBoardCardModal onClose={() => setOpen(false)} open={open} />}
    </>
  )
}
