import type { BoardCard as BoardCardType } from '../../model/types'

import { type ComponentPropsWithoutRef, type FC, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { Icons } from '@/shared/assets/icons'
import clsx from 'clsx'

import { useBoardSearch } from '../../model/use-board-search'
import { useRemoveBoardCard } from '../../model/use-remove-board-card'
import { BoardTask } from '../board-task/board-task'
import { CreateBoardTask } from '../create-board-task/create-board-task'
import { UpdateBoardCardModal } from '../modals/update-board-card-modal'

type BoardCardProps = {
  card: BoardCardType
  index: number
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const BoardCard: FC<BoardCardProps> = ({ card, className, index, ...rest }) => {
  const [updateCardModalOpen, setUpdateCardModalOpen] = useState(false)

  const { removeBoardCard } = useRemoveBoardCard(card.id)

  const { filterTasksWithQuery, query } = useBoardSearch()

  const tasks = !query ? card.tasks : card.tasks.filter(filterTasksWithQuery)

  return (
    <Draggable draggableId={card.id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <div
          {...rest}
          {...draggableProps}
          className={clsx('w-[300px] bg-white rounded-lg py-3 px-2 mx-2 flex flex-col', className)}
          ref={innerRef}
        >
          <div className={'flex items-center gap-2 [&_.action]:hover:opacity-100'}>
            <div {...dragHandleProps} className={'p-1 hover:bg-teal-100 rounded cursor-[grab]'}>
              <Icons.DotsSixVertical />
            </div>

            <span className={'text-lg mr-auto block'}>{card.title}</span>

            <button
              className={
                'text-teal-600 p-1 rounded-full hover:bg-teal-100 transition-all opacity-0 action'
              }
              onClick={() => setUpdateCardModalOpen(true)}
            >
              <Icons.Edit className={'h-4 w-4'} />
            </button>

            <button
              className={
                'text-rose-600 p-1 rounded-full hover:bg-rose-100 transition-all opacity-0 action'
              }
              onClick={removeBoardCard}
            >
              <Icons.TrashOutlined className={'w-4 h-4'} />
            </button>

            {updateCardModalOpen && (
              <UpdateBoardCardModal
                card={card}
                onClose={() => setUpdateCardModalOpen(false)}
                open={updateCardModalOpen}
              />
            )}
          </div>

          <div className={'mt-2'}>
            <CreateBoardTask cardId={card.id} />
          </div>

          <Droppable direction={'vertical'} droppableId={card.id} type={'BoardTask'}>
            {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => (
              <div
                {...droppableProps}
                className={clsx('p-1', isDraggingOver && 'bg-blue-100/50')}
                ref={innerRef}
              >
                {tasks.map((task, index) => (
                  <BoardTask cardId={card.id} index={index} key={task.id} task={task} />
                ))}
                {placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}
