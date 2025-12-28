import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { tasks as baseTasks, type TaskStatus } from '@/data/tasks'

const STORAGE_KEY = 'wuxi-task-statuses'

type StatusMap = Record<string, TaskStatus>

const isTaskStatus = (value: unknown): value is TaskStatus =>
  value === 'todo' || value === 'in-progress' || value === 'done'

const loadStatuses = (): StatusMap => {
  if (typeof localStorage === 'undefined') return {}
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return {}
    const parsed = JSON.parse(stored) as Record<string, unknown>
    return Object.entries(parsed).reduce<StatusMap>((acc, [key, val]) => {
      if (isTaskStatus(val)) acc[key] = val
      return acc
    }, {})
  } catch {
    return {}
  }
}

const persistStatuses = (statuses: StatusMap) => {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses))
}

export const useTaskStore = defineStore('tasks', () => {
  const overrides = ref<StatusMap>(loadStatuses())

  const tasks = computed(() =>
    baseTasks.map((task) => ({
      ...task,
      status: overrides.value[task.id] ?? task.status,
    })),
  )

  const setStatus = (id: string, status: TaskStatus) => {
    overrides.value = { ...overrides.value, [id]: status }
    persistStatuses(overrides.value)
  }

  const resetStatuses = () => {
    overrides.value = {}
    persistStatuses(overrides.value)
  }

  return {
    tasks,
    setStatus,
    resetStatuses,
  }
})
