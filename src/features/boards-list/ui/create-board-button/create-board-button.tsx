import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui'

import { CreateBoardModal } from '../create-board-modal/create-board-modal'

export const CreateBoardButton = () => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>{t('pages.boards.add-board.button')}</Button>
      {open && <CreateBoardModal onClose={() => setOpen(false)} open={open} />}
    </>
  )
}
