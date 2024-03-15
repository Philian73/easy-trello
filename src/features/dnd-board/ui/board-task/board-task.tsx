import { type ComponentPropsWithoutRef, type FC, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { toast } from 'react-toastify'

import { BoardTask as BoardTaskType } from '@/entities/board'
import { UserPreview, useUsers } from '@/entities/user'
import { Icons } from '@/shared/assets/icons'
import { handleErrorResponse } from '@/shared/lib/utils'
import clsx from 'clsx'

import { useRemoveBoardTask } from '../../model/use-remove-board-task'
import { UpdateBoardTaskModal } from '../modals/update-board-task-modal'

type BoardTaskProps = {
  cardId: string
  index: number
  task: BoardTaskType
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const BoardTask: FC<BoardTaskProps> = ({ cardId, className, index, task, ...rest }) => {
  const [updateBoardTaskModalOpen, setUpdateBoardTaskModalOpen] = useState(false)

  const assignee = useUsers(state => (task.assigneeId ? state.usersMap()[task.assigneeId] : null))

  const { removeBoardTask } = useRemoveBoardTask()

  const handleRemoveBoardTask = async () => {
    try {
      const res = await removeBoardTask(cardId, task.id)

      if (res !== null) {
        toast.success('Задача успешно удалена.')
      }
    } catch (error) {
      handleErrorResponse(error, toast.error)
    }
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <div
          {...rest}
          {...draggableProps}
          className={clsx('py-1 relative', className)}
          ref={innerRef}
        >
          <div className={'p-2 rounded shadow bg-white'}>
            <div className={'flex items-center gap-2 [&_.action]:hover:opacity-100'}>
              <div
                {...dragHandleProps}
                className={'p-1 hover:bg-teal-100 rounded cursor-[grab] relative z-10'}
              >
                <Icons.DotsSixVertical />
              </div>

              <button
                className={'hover:underline p-1 text-lg grow text-start leading-tight'}
                onClick={() => setUpdateBoardTaskModalOpen(true)}
              >
                {task.title}
              </button>

              <button
                className={
                  'text-rose-600 p-1 rounded-full hover:bg-rose-100 transition-all opacity-0 action'
                }
                onClick={handleRemoveBoardTask}
              >
                <Icons.TrashOutlined className={'w-4 h-4'} />
              </button>

              {updateBoardTaskModalOpen && (
                <UpdateBoardTaskModal
                  cardId={cardId}
                  onClose={() => setUpdateBoardTaskModalOpen(false)}
                  open={updateBoardTaskModalOpen}
                  task={task}
                />
              )}
            </div>

            {assignee && <UserPreview className={'mt-3'} size={'sm'} {...assignee} />}
          </div>
        </div>
      )}
    </Draggable>
  )
}
