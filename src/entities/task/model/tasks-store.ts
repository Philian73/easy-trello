import type { CreateTaskData, Task, UpdateTaskData } from './types'

import { nanoid } from 'nanoid'
import { create } from 'zustand'

import { tasksRepository } from './tasks-repository'

export type TasksStore = {
  createTask: (data: CreateTaskData, authorId: string) => Promise<void>
  getTaskById: (taskId: string) => Task | undefined
  loadTasks: () => Promise<void>
  removeBoardFromTasks: (userId: string, boardId: string) => Promise<void>
  removeTask: (taskId: string) => Promise<void>
  removeUserTasks: (userId: string) => Promise<void>
  tasks: Task[]
  updateTask: (taskId: string, data: UpdateTaskData) => Promise<void>
}

export const useTasks = create<TasksStore>((set, get) => ({
  async createTask(data, authorId) {
    const newTask = { authorId, id: nanoid(), ...data }

    await tasksRepository.saveTask(newTask)

    set({
      tasks: await tasksRepository.getTasks(),
    })
  },
  getTaskById(taskId) {
    return get().tasks.find(task => task.id === taskId)
  },
  async loadTasks() {
    set({
      tasks: await tasksRepository.getTasks(),
    })
  },
  async removeBoardFromTasks(userId, boardId) {
    const tasksToUpdate = get().tasks.filter(
      task => task.authorId === userId && task.boardId === boardId
    )

    for (const task of tasksToUpdate) {
      await tasksRepository.saveTask({
        ...task,
        boardId: undefined,
      })
    }

    set({
      tasks: await tasksRepository.getTasks(),
    })
  },
  async removeTask(taskId) {
    await tasksRepository.removeTask(taskId)

    set({
      tasks: await tasksRepository.getTasks(),
    })
  },
  async removeUserTasks(userId) {
    const tasksToRemove = get().tasks.filter(task => task.authorId === userId)

    for (const task of tasksToRemove) {
      await tasksRepository.removeTask(task.id)
    }
  },
  tasks: [],
  async updateTask(taskId, data) {
    const task = await tasksRepository.getTask(taskId)

    if (!task) {
      return
    }

    const newTask = { ...task, ...data }

    await tasksRepository.saveTask(newTask)

    set({
      tasks: await tasksRepository.getTasks(),
    })
  },
}))
