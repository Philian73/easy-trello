import { type ComponentPropsWithoutRef, type FC, useCallback } from 'react'

import { useBoards } from '@/entities/board'
import { useTasks } from '@/entities/task'
import { RemoveTaskButton } from '@/features/task/remove-task'
import { UpdateTaskButton } from '@/features/task/update-task'
import { useCanViewTaskFn } from '@/features/task/view-task'

type TasksListProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const TasksList: FC<TasksListProps> = props => {
  const tasks = useTasks(state => state.tasks)
  const getBoardById = useBoards(state => state.getBoardById)

  const canViewTask = useCanViewTaskFn()

  const getBoardName = useCallback(
    (boardId?: string) => getBoardById(boardId)?.name ?? '',
    [getBoardById]
  )

  return (
    <div {...props}>
      <h2 className={'text-lg mb-2 font-semibold'}>Все задачи</h2>
      <table className={'w-full'}>
        <thead>
          <tr>
            <th className={'text-start'}>Название:</th>
            <th className={'text-start'}>Доска:</th>
            <th className={'w-1'}></th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .filter(task => canViewTask(task.id))
            .map(task => (
              <tr className={'px-5 py-2 border-b border-b-slate-3 '} key={task.id}>
                <td className={'p-2'}>{task.title}</td>
                <td className={'p-2'}>{getBoardName(task.boardId)}</td>
                <td className={'p-2'}>
                  <div className={'flex gap-2 ml-auto'}>
                    <UpdateTaskButton taskId={task.id} />
                    <RemoveTaskButton taskId={task.id} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
