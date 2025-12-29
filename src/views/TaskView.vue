<script setup lang="ts">
import { computed, ref, type FunctionalComponent } from 'vue'
import { type TaskStatus } from '@/data/tasks'
import { useTaskStore } from '@/stores/tasks'
import {
  EllipsisHorizontalCircleIcon as TodoIcon,
  PlayCircleIcon as OngoiningIcon,
  CheckCircleIcon as DoneIcon,
  MapPinIcon,
  CurrencyYenIcon,
  ClockIcon,
} from '@heroicons/vue/24/outline'

type Filter = TaskStatus | 'all'

const filter = ref<Filter>('all')
const hideDone = ref(false)
const taskStore = useTaskStore()

const visibleTasks = computed(() =>
  taskStore.tasks.filter((task) => {
    if (hideDone.value && task.status === 'done') return false
    if (filter.value === 'all') return true
    return task.status === filter.value
  }),
)

const filterOptions: { value: Filter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'todo', label: '待办' },
  { value: 'in-progress', label: '进行中' },
  { value: 'done', label: '已完成' },
]

const statusTone: Record<TaskStatus, string> = {
  todo: 'text-blue-700 dark:text-blue-200',
  'in-progress': 'text-amber-700 dark:text-amber-200',
  done: 'text-emerald-700 dark:text-emerald-200',
}

const statusIcons: Record<TaskStatus, FunctionalComponent> = {
  todo: TodoIcon,
  'in-progress': OngoiningIcon,
  done: DoneIcon,
}

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: '待办' },
  { value: 'in-progress', label: '进行中' },
  { value: 'done', label: '已完成' },
]

const updateStatus = (id: string, status: TaskStatus) => {
  taskStore.setStatus(id, status)
}
</script>

<template>
  <section class="flex-grow min-w-1/2 mx-auto px-4 py-6 md:py-8">
    <header class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      <div>
        <p class="text-sm uppercase tracking-[0.2em] opacity-60 mb-1">差务清单</p>
        <h1 class="text-2xl font-bold">当前差务</h1>
      </div>

      <div class="flex flex-wrap gap-2 items-center">
        <label class="inline-flex items-center gap-2 text-sm">
          <input v-model="hideDone" type="checkbox" class="size-4" />
          隐藏已完成
        </label>
        <div
          class="flex items-center rounded-full border border-border/70 dark:border-border/40 overflow-hidden"
        >
          <button
            v-for="option in filterOptions"
            :key="option.value"
            type="button"
            class="px-3 py-1 text-sm transition-colors duration-200 flex items-center gap-1"
            :class="[
              filter === option.value
                ? 'bg-surface-strong/80 dark:bg-surface-strong/60 font-semibold'
                : 'bg-transparent',
            ]"
            @click="filter = option.value"
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
      </div>
    </header>

    <div
      class="grid gap-3"
      :class="
        visibleTasks.length === 0
          ? 'border border-dashed border-border/60 dark:border-border/40 rounded-lg p-6 text-center'
          : ''
      "
    >
      <p v-if="visibleTasks.length === 0" class="opacity-70">没有符合条件的任务。</p>

      <div
        v-for="task in visibleTasks"
        :key="task.id"
        class="rounded-lg border border-border/70 dark:border-border/40 bg-surface-strong/50 dark:bg-surface-strong/30 p-4 flex flex-col gap-2"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <h2 class="text-lg font-semibold leading-tight">{{ task.title }}</h2>
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
    </div>
  </section>
</template>
