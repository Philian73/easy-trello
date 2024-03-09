import type { Task } from './types'

import { persistStorage } from '@/shared/lib/localforage'

const TASKS_STORAGE_KEY = 'tasks_storage'

export const tasksRepository = {
  async getTask(taskId: string): Promise<Task | undefined> {
    return persistStorage
      .getItemSafe<Task[]>(TASKS_STORAGE_KEY, [])
      .then(tasks => tasks.find(task => task.id === taskId))
  },
  async getTasks(): Promise<Task[]> {
    return persistStorage.getItemSafe<Task[]>(TASKS_STORAGE_KEY, [])
  },
  async removeTask(taskId: string) {
    const tasks = await this.getTasks()

    await persistStorage.setItemSafe(
      TASKS_STORAGE_KEY,
      tasks.filter(task => task.id !== taskId)
    )
  },
  async saveTask(value: Task) {
    const tasks = await this.getTasks()
    const taskIndex = tasks.findIndex(task => task.id === value.id)

    if (taskIndex === -1) {
      tasks.push(value)
    } else {
      tasks[taskIndex] = value
    }

    await persistStorage.setItemSafe(TASKS_STORAGE_KEY, tasks)
  },
}
