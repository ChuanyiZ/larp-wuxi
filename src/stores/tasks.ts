import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { tasks as baseTasks, type TaskStatus } from '@/data/tasks'

const STORAGE_KEY = 'wuxi-task-save'

type StatusMap = Record<string, TaskStatus>

type TaskSnapshot = {
  id: string
  name: string
  statuses: StatusMap
}

type TaskSaveData = {
  activeId: string
  snapshots: TaskSnapshot[]
}

const isTaskStatus = (value: unknown): value is TaskStatus =>
  value === 'todo' || value === 'in-progress' || value === 'done'

const defaultStatuses = (): StatusMap =>
  baseTasks.reduce<StatusMap>((acc, task) => {
    acc[task.id] = task.status
    return acc
  }, {})

const defaultSnapshot = (): TaskSnapshot => ({
  id: `snapshot-${Date.now()}`,
  name: '默认存档',
  statuses: defaultStatuses(),
})

const validateSnapshot = (raw: unknown): TaskSnapshot | null => {
  if (!raw || typeof raw !== 'object') return null
  const { id, name, statuses } = raw as Partial<TaskSnapshot>
  if (!statuses || typeof statuses !== 'object') return null
  const cleaned: StatusMap = { ...defaultStatuses() }
  for (const [key, val] of Object.entries(statuses)) {
    if (isTaskStatus(val)) {
      cleaned[key] = val
    }
  }
  const snapshotName = typeof name === 'string' && name.trim() ? name.trim() : '未命名存档'
  const snapshotId = typeof id === 'string' && id.trim() ? id : `snapshot-${Date.now()}`
  return { id: snapshotId, name: snapshotName, statuses: cleaned }
}

const loadData = (): TaskSaveData => {
  const fallbackSnapshot = defaultSnapshot()
  if (typeof localStorage === 'undefined') {
    return { activeId: fallbackSnapshot.id, snapshots: [fallbackSnapshot] }
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return { activeId: fallbackSnapshot.id, snapshots: [fallbackSnapshot] }
    const parsed = JSON.parse(stored) as Partial<TaskSaveData>
    const rawSnapshots = Array.isArray(parsed.snapshots) ? parsed.snapshots : []
    const snapshots = rawSnapshots
      .map((snap) => validateSnapshot(snap))
      .filter((snap): snap is TaskSnapshot => Boolean(snap))
    if (snapshots.length === 0) {
      snapshots.push(fallbackSnapshot)
    }
    const activeId =
      typeof parsed.activeId === 'string' && snapshots.some((s) => s.id === parsed.activeId)
        ? parsed.activeId
        : fallbackSnapshot.id
    return { activeId, snapshots }
  } catch {
    return { activeId: fallbackSnapshot.id, snapshots: [fallbackSnapshot] }
  }
}

const persistData = (data: TaskSaveData) => {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const useTaskStore = defineStore('tasks', () => {
  const data = ref<TaskSaveData>(loadData())
  persistData(data.value)

  const activeSnapshot = computed(() =>
    data.value.snapshots.find((snap) => snap.id === data.value.activeId),
  )

  const activeId = computed(() => activeSnapshot.value?.id)
  const snapshotName = computed(() => activeSnapshot.value?.name)
  const snapshots = computed(() => data.value.snapshots)

  const tasks = computed(() =>
    baseTasks.map((task) => {
      const active = activeSnapshot.value
      return {
        ...task,
        status: active?.statuses[task.id] ?? task.status,
      }
    }),
  )

  const setStatus = (id: string, status: TaskStatus) => {
    const active = activeSnapshot.value
    if (!active) return
    active.statuses = { ...active.statuses, [id]: status }
    data.value = {
      ...data.value,
      snapshots: data.value.snapshots.map((snap) => (snap.id === active.id ? active : snap)),
    }
    persistData(data.value)
  }

  const resetStatuses = () => {
    const active = activeSnapshot.value
    if (!active) return
    active.statuses = defaultStatuses()
    data.value = {
      ...data.value,
      snapshots: data.value.snapshots.map((snap) => (snap.id === active.id ? active : snap)),
    }
    persistData(data.value)
  }

  const startNewSave = (name: string) => {
    const safeName = name.trim() || '新的存档'
    const newSnapshot: TaskSnapshot = {
      id: `snapshot-${Date.now()}`,
      name: safeName,
      statuses: defaultStatuses(),
    }
    data.value = {
      activeId: newSnapshot.id,
      snapshots: [...data.value.snapshots, newSnapshot],
    }
    persistData(data.value)
  }

  const activateSnapshot = (id: string) => {
    if (data.value.snapshots.some((snap) => snap.id === id)) {
      data.value = { ...data.value, activeId: id }
      persistData(data.value)
    }
  }

  return {
    tasks,
    snapshotName,
    activeId,
    snapshots,
    setStatus,
    resetStatuses,
    startNewSave,
    activateSnapshot,
  }
})
