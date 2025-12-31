<script setup lang="ts">
import { computed, ref, type FunctionalComponent } from 'vue'
import {
  taskTypeLabels,
  statusLabels,
  type TaskStatus,
  type TaskType,
  type TaskMain,
  type TaskSide,
} from '@/data/tasks'
import { useTaskStore } from '@/stores/tasks'
import TaskSaveControls from '@/components/TaskSaveControls.vue'
import {
  EllipsisHorizontalCircleIcon as TodoIcon,
  PlayCircleIcon as OngoiningIcon,
  CheckCircleIcon as DoneIcon,
  MapPinIcon,
  CurrencyYenIcon,
  ClockIcon,
} from '@heroicons/vue/24/outline'

type StatusFilter = TaskStatus | 'all'
type TypeFilter = TaskType | 'all'

const statusFilter = ref<StatusFilter>('all')
const typeFilter = ref<TypeFilter>('all')
const summaryOpen = ref(false)
const taskStore = useTaskStore()

const visibleTasks = computed(() =>
  taskStore.tasks.filter((task) => {
    const statusOk = statusFilter.value === 'all' ? true : task.status === statusFilter.value
    const typeOk = typeFilter.value === 'all' ? true : task.taskType === typeFilter.value
    return statusOk && typeOk
  }),
)

const statusFilterOptions = computed<{ value: StatusFilter; label: string }[]>(() => [
  { value: 'all', label: '全部状态' },
  {
    value: 'todo',
    label: `${statusLabels.todo}(${taskStore.tasks.filter((t) => t.status === 'todo').length})`,
  },
  {
    value: 'in-progress',
    label: `${statusLabels['in-progress']} (${taskStore.tasks.filter((t) => t.status === 'in-progress').length})`,
  },
  {
    value: 'done',
    label: `${statusLabels.done} (${taskStore.tasks.filter((t) => t.status === 'done').length})`,
  },
])

const typeCounts = computed(() => {
  const main = taskStore.tasks.filter((t) => t.taskType === 'main')
  const side = taskStore.tasks.filter((t) => t.taskType === 'side')
  return {
    main: { total: main.length, done: main.filter((t) => t.status === 'done').length },
    side: { total: side.length, done: side.filter((t) => t.status === 'done').length },
  }
})

const typeFilterOptions = computed<{ value: TypeFilter; label: string }[]>(() => [
  { value: 'all', label: '全部类型' },
  { value: 'main', label: `${taskTypeLabels.main} (${typeCounts.value.main.total})` },
  { value: 'side', label: `${taskTypeLabels.side} (${typeCounts.value.side.total})` },
  { value: 'report', label: `${taskTypeLabels.report}` },
])

const statusTone: Record<TaskStatus, string> = {
  todo: 'text-blue-500 dark:text-blue-200',
  'in-progress': 'text-yellow-500 dark:text-yellow-200',
  done: 'text-emerald-500 dark:text-emerald-200',
}

const statusIcons: Record<TaskStatus, FunctionalComponent> = {
  todo: TodoIcon,
  'in-progress': OngoiningIcon,
  done: DoneIcon,
}

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: statusLabels.todo },
  { value: 'in-progress', label: statusLabels['in-progress'] },
  { value: 'done', label: statusLabels.done },
]

const typeTone: Record<TaskType, string> = {
  main: 'bg-rose-50 text-rose-700 dark:bg-rose-900/50 dark:text-rose-100',
  side: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-100',
  report: 'bg-violet-50 text-violet-700 dark:bg-violet-900/50 dark:text-violet-100',
}

const typeToneText: Record<TaskType, string> = {
  main: 'text-rose-700 dark:text-rose-300',
  side: 'text-cyan-700 dark:text-cyan-300',
  report: 'text-violet-700 dark:text-violet-300',
}

const updateStatus = (id: string, status: TaskStatus) => {
  taskStore.setStatus(id, status)
}

const summary = computed(() => {
  const total = taskStore.tasks.length
  const todo = taskStore.tasks.filter((t) => t.status === 'todo').length
  const inProgress = taskStore.tasks.filter((t) => t.status === 'in-progress').length
  const done = taskStore.tasks.filter((t) => t.status === 'done').length
  const rewards = taskStore.tasks
    .filter((t) => t.status === 'done' && typeof t.reward === 'number')
    .reduce((acc, t) => acc + (t.reward ?? 0), 0)
  const seals = Array.from(
    new Set(
      taskStore.tasks
        .filter((t) => t.status === 'done' && 'seal' in t && typeof t.seal === 'string')
        .map((t) => (t as TaskMain).seal as string),
    ),
  )
  const tags = Array.from(
    new Set(
      taskStore.tasks
        .filter((t) => t.status === 'done' && 'tag' in t)
        .map((t) => (t as TaskSide).tag as string),
    ),
  )
  const mainDone = typeCounts.value.main.done
  const mainTotal = typeCounts.value.main.total
  const sideDone = typeCounts.value.side.done
  const sideTotal = typeCounts.value.side.total
  return {
    total,
    todo,
    inProgress,
    done,
    rewards,
    seals,
    tags,
    mainDone,
    mainTotal,
    sideDone,
    sideTotal,
  }
})
</script>

<template>
  <section class="grow min-w-1/2 mx-auto px-4 py-2 lg:py-6">
    <header class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      <h1 class="text-2xl font-bold">差务清单</h1>

      <div class="flex flex-wrap gap-2 items-center">
        <div
          class="flex items-center rounded-full border border-border/70 dark:border-border/40 overflow-hidden"
        >
          <button
            v-for="option in statusFilterOptions"
            :key="option.value"
            type="button"
            class="px-2 py-1 text-sm transition-colors duration-200 flex items-center gap-1"
            :class="[
              statusFilter === option.value
                ? 'bg-surface-strong/80 dark:bg-surface-strong/60 font-semibold'
                : 'bg-transparent',
            ]"
            @click="statusFilter = option.value"
          >
            <component
              v-if="option.value !== 'all'"
              :is="statusIcons[option.value]"
              :class="statusTone[option.value]"
              class="size-4 inline"
            />
            {{ option.label }}
          </button>
        </div>

        <div
          class="flex items-center rounded-full border border-border/70 dark:border-border/40 overflow-hidden"
        >
          <button
            v-for="option in typeFilterOptions"
            :key="option.value"
            type="button"
            class="px-2 py-1 text-sm transition-colors duration-200"
            :class="[
              typeFilter === option.value
                ? 'bg-surface-strong/80 dark:bg-surface-strong/60 font-semibold'
                : 'bg-transparent',
              option.value !== 'all' ? typeToneText[option.value] : '',
            ]"
            @click="typeFilter = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </header>

    <div class="mb-4 space-y-3">
      <button
        type="button"
        class="flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg border border-border/60 dark:border-border/40 bg-surface-strong/60 dark:bg-surface-strong/40"
        @click="summaryOpen = !summaryOpen"
      >
        <span>{{ summaryOpen ? '-' : '+' }}</span>
        <span>进度汇总</span>
      </button>

      <div
        v-if="summaryOpen"
        class="space-y-3 rounded-lg border border-border/60 dark:border-border/40 bg-surface-strong/50 dark:bg-surface-strong/30 p-2 text-xs lg:text-sm"
      >
        <div class="flex flex-wrap gap-2">
          <span class="badge">
            <span class="opacity-70">累积奖励</span>
            <span class="font-semibold">¥{{ summary.rewards }}</span>
          </span>
          <span class="badge">
            <span class="opacity-70">进行中</span>
            <span class="font-semibold">{{ summary.inProgress }} / {{ summary.total }}</span>
          </span>
          <span class="badge">
            <span class="opacity-70">已完成</span>
            <span class="font-semibold">{{ summary.done }} / {{ summary.total }}</span>
          </span>
          <span class="badge">
            <span class="opacity-70">主线</span>
            <span class="font-semibold">{{ summary.mainDone }} / {{ summary.mainTotal }}</span>
            <span
              v-for="seal in summary.seals"
              :key="seal"
              class="chip chip-main font-songti text-xs"
            >
              {{ seal }}
            </span>
          </span>
          <span class="badge">
            <span class="opacity-70">支线</span>
            <span class="font-semibold">{{ summary.sideDone }} / {{ summary.sideTotal }}</span>
            <span
              v-for="tag in summary.tags"
              :key="tag"
              class="chip chip-side font-songti text-xs"
              :class="typeTone['side']"
            >
              {{ tag }}
            </span>
          </span>
        </div>
        <TaskSaveControls />
      </div>
    </div>

    <div
      class="flex flex-col gap-3"
      :class="
        visibleTasks.length === 0
          ? 'border border-dashed border-border/60 dark:border-border/40 rounded-lg p-6 text-center'
          : ''
      "
    >
      <p v-if="visibleTasks.length === 0" class="opacity-70">没有符合条件的任务。</p>

      <TransitionGroup name="list" tag="div" class="flex flex-col gap-3" mode="out-in">
        <div
          v-for="task in visibleTasks"
          :key="task.id"
          class="rounded-lg border border-border/70 dark:border-border/40 bg-surface-strong/50 dark:bg-surface-strong/30 p-4 flex flex-col gap-2"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex flex-col gap-1">
              <span
                class="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full w-fit"
                :class="typeTone[task.taskType]"
              >
                {{ taskTypeLabels[task.taskType] }}
              </span>
              <div class="text-lg font-semibold leading-tight flex items-center gap-2">
                <div v-if="task.taskType === 'main'" class="text-sm chip-main font-songti">
                  {{ task.seal }}
                </div>
                <div
                  v-else-if="task.taskType === 'side'"
                  class="text-sm chip-side font-songti"
                  :class="typeTone[task.taskType]"
                >
                  {{ task.tag }}
                </div>
                {{ task.title }}
              </div>
            </div>
            <div class="flex items-center gap-1">
              <span
                class="text-xs font-semibold px-2 py-1 rounded-full"
                :class="statusTone[task.status]"
              >
                <component :is="statusIcons[task.status]" class="size-4 inline" />
              </span>
              <select
                :id="`status-${task.id}`"
                class="text-xs border border-border/70 dark:border-border/40 rounded-lg px-1 py-.5 bg-current/5"
                :value="task.status"
                aria-label="更新状态"
                @change="
                  updateStatus(task.id, ($event.target as HTMLSelectElement).value as TaskStatus)
                "
              >
                <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
          <p v-if="task.description" class="text-sm opacity-80">{{ task.description }}</p>
          <div class="flex justify-end-safe items-center gap-5 text-xs">
            <div v-if="task.area" class="flex items-center">
              <MapPinIcon class="w-4 h-4 me-1" />
              {{ task.area }}
            </div>
            <div v-if="task.reward" class="flex items-center" title="奖励">
              <CurrencyYenIcon class="w-4 h-4 me-1" />
              {{ task.reward }}
            </div>
            <div v-if="task.due" class="flex items-center">
              <ClockIcon class="w-4 h-4 me-1" />
              {{ task.due }}
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>

<style lang="css" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 250ms ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@import 'tailwindcss';

.badge {
  @apply inline-flex items-center gap-1 bg-white/60 dark:bg-black/10 rounded-full px-3 py-1;
}

.chip-main {
  @apply px-0.5 border-2 rounded-md border-red-700 text-red-700 dark:border-red-500 dark:text-red-500 font-bold;
}

.chip-side {
  @apply px-0.5 rounded font-semibold;
}
</style>
