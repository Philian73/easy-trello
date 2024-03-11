import { type BoardPartial, useBoards } from '@/entities/board'
import { Select } from '@/shared/ui'

type BoardSelectProps = {
  boardId?: string
  className?: string
  errorMessage?: string
  filterOptions: (board: BoardPartial) => boolean
  label?: string
  onChangeBoardId: (id?: string) => void
  required?: boolean
}

export const BoardSelect = ({
  boardId,
  filterOptions,
  onChangeBoardId,
  required,
  ...rest
}: BoardSelectProps) => {
  const board = useBoards(state => state.getBoardById(boardId))
  const boards = useBoards(state => state.boards.filter(filterOptions))

  const options = required ? boards : [{ id: '', name: 'Нет доски' } as BoardPartial, ...boards]

  const onChangeBoard = (board?: BoardPartial) => {
    onChangeBoardId(board?.id)
  }

  return (
    <Select
      {...rest}
      getLabel={board => board?.name}
      onChange={onChangeBoard}
      options={options}
      value={board ?? options[0]}
    />
  )
}
