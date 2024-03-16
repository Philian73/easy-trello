import type { ComponentPropsWithoutRef, FC } from 'react'
import { DragDropContext, type DropResult, Droppable } from 'react-beautiful-dnd'

import clsx from 'clsx'

import { useBoardStore } from '../../model/use-board-store'
import { BoardCard } from '../board-card/board-card'

type BoardProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const Board: FC<BoardProps> = ({ className, ...rest }) => {
  const boardStore = useBoardStore()
  const board = boardStore.useSelector(state => state.board)
  const cards = board.cards
  const moveBoardCard = boardStore.useSelector(state => state.moveBoardCard)
  const moveBoardTask = boardStore.useSelector(state => state.moveBoardTask)

  if (cards.length === 0) {
    return <span className={'mt-5 text-xl'}>Список карточек пуст.</span>
  }

  const onDragEnd = async (e: DropResult) => {
    if (e.type === 'BoardCard' && e.destination) {
      await moveBoardCard(e.source.index, e.destination.index ?? 0)
    }
    if (e.type === 'BoardTask' && e.destination) {
      await moveBoardTask(
        {
          cardId: e.source.droppableId,
          index: e.source.index,
        },
        {
          cardId: e.destination.droppableId,
          index: e.destination.index,
        }
      )
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable direction={'horizontal'} droppableId={'board'} type={'BoardCard'}>
        {({ droppableProps, innerRef, placeholder }) => (
          <div
            {...rest}
            {...droppableProps}
            className={clsx('flex bg-gray-100 rounded-xl p-4 px-2', className)}
            ref={innerRef}
          >
            {cards.map((card, index) => (
              <BoardCard card={card} index={index} key={card.id} />
            ))}

            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
