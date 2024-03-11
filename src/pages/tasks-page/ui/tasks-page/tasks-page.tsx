import type { FC } from 'react'

import { useCanViewBoardFn } from '@/features/board/view-board'
import { CreateTaskForm, useCanCreateTask } from '@/features/task/create-task'
import { updateTaskDepsContext } from '@/features/task/update-task'
import { CenterContentLayout } from '@/shared/ui/layouts'

import { TasksList } from '../tasks-list/tasks-list'

export const TasksPage: FC = () => {
  const canCreate = useCanCreateTask()
  const canViewBoard = useCanViewBoardFn()

  const body = (
    <>
      <div className={'mb-10'}>
        <h2 className={'text-lg mb-2 font-semibold'}>Добавить задачу</h2>
        <CreateTaskForm />
      </div>
      <TasksList />
    </>
  )

  return (
    <updateTaskDepsContext.Provider
      value={{
        canViewBoard,
      }}
    >
      <CenterContentLayout className={'py-10'}>
        <h1 className={'text-3xl mb-10'}>Задачи</h1>

        {canCreate ? (
          body
        ) : (
          <span className={'mt-5 text-xl block'}>У вас нет прав для работы с этой страницей.</span>
        )}
      </CenterContentLayout>
    </updateTaskDepsContext.Provider>
  )
}
