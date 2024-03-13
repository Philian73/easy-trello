import type { CreateTaskData, Task, UpdateTaskData } from './types'

import { nanoid } from 'nanoid'
import { create } from 'zustand'

import { tasksRepository } from './tasks-repository'

export type TasksStore = {
  createTask: (data: CreateTaskData, authorId: string) => Promise<Task>
  getTaskById: (taskId: string) => Task | undefined
  loadTasks: () => Promise<void>
  removeTask: (taskId: string) => Promise<void>
  removeUserTasks: (userId: string) => Promise<void>
  tasks: Task[]
  updateTask: (taskId: string, data: UpdateTaskData) => Promise<Task>
}

export const useTasks = create<TasksStore>((set, get) => ({
  async createTask(data, authorId) {
    const newTask = { authorId, id: nanoid(), ...data }

    await tasksRepository.saveTask(newTask)

    set({
      tasks: await tasksRepository.getTasks(),
    })

    return newTask
  },
  getTaskById(taskId) {
    return get().tasks.find(task => task.id === taskId)
  },
  async loadTasks() {
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
      throw new Error()
    }

    const newTask = { ...task, ...data }

    await tasksRepository.saveTask(newTask)

    set({
      tasks: await tasksRepository.getTasks(),
    })

    return newTask
  },
}))
