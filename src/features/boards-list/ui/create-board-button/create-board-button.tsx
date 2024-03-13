import { useState } from 'react'

import { CreateBoardModal } from '@/features/boards-list/ui/create-board-modal/create-board-modal'
import { Button } from '@/shared/ui'

export const CreateBoardButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Новая доска</Button>
      {open && <CreateBoardModal onClose={() => setOpen(false)} open={open} />}
    </>
  )
}
