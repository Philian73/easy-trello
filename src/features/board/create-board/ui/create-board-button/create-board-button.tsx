import { useState } from 'react'

import { Button } from '@/shared/ui'

import { CreateBoardModal } from '../create-board-modal/create-board-modal'

export const CreateBoardButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Новая доска</Button>
      {open && <CreateBoardModal onClose={() => setOpen(false)} open={open} />}
    </>
  )
}
