import { useState } from 'react'

import { Button } from '@/shared/ui'

import { CreateBoardCardModal } from '../modals/create-board-card-modal'

export const CreateBoardCardButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Добавить карточку</Button>
      {open && <CreateBoardCardModal onClose={() => setOpen(false)} open={open} />}
    </>
  )
}
