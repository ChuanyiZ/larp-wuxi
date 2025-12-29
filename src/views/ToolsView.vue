<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { toTraditionalTime } from '@/utils/ancientTime'

const now = ref(new Date())
const manualHour = ref(12)
const manualMinute = ref(0)
let timer: number | undefined

const tick = () => {
  now.value = new Date()
}

onMounted(() => {
  tick()
  timer = window.setInterval(tick, 1000)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})

const modernText = computed(() =>
  now.value.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }),
)

const traditionalText = computed(() => toTraditionalTime(now.value))

const manualDate = computed(() => {
  const d = new Date()
  d.setHours(manualHour.value, manualMinute.value, 0, 0)
  return d
})

const manualTraditional = computed(() => toTraditionalTime(manualDate.value))

const timeline = computed(() =>
  Array.from({ length: 24 }).map((_, hour) => {
    const d = new Date()
    d.setHours(hour, 0, 0, 0)
    return {
      hour,
      label: `${hour}时`,
      branch: toTraditionalTime(d).slice(0, 2),
    }
  }),
)
</script>

<template>
  <section class="min-w-5/6 lg:min-w-1/2 mx-auto px-4 py-6 lg:py-8 space-y-6">
    <header class="space-y-1">
      <h1 class="text-3xl font-bold">工具箱</h1>
    </header>

    <div
      class="rounded-xl border border-border/70 dark:border-border/40 bg-surface-strong/50 dark:bg-surface-strong/30 p-4 lg:p-6 space-y-4"
    >
      <h2 class="text-xl font-semibold">古今时间转换器</h2>

      <!-- Current -->
      <div class="space-y-1">
        <p class="font-semibold">当前时间</p>
        <div class="flex items-center gap-3 flex-wrap text-lg font-semibold">
          <span>{{ modernText }}</span>
          <span class="text-emerald-700 dark:text-emerald-200">{{ traditionalText }}</span>
        </div>
      </div>

      <!-- Manual -->
      <div class="space-y-1">
        <p class="font-semibold">任意时间</p>
        <div class="space-y-2 flex items-center gap-3 flex-wrap">
          <div class="flex gap-2 items-center text-sm">
            <input
              v-model.number="manualHour"
              type="number"
              min="0"
              max="23"
              class="w-15 rounded-lg border border-border/70 dark:border-border/40 bg-transparent px-3 py-2"
            />
            <span>:</span>
            <input
              v-model.number="manualMinute"
              type="number"
              min="0"
              max="59"
              class="w-15 rounded-lg border border-border/70 dark:border-border/40 bg-transparent px-3 py-2"
            />
          </div>
          <div class="text-lg font-semibold text-emerald-700 dark:text-emerald-200">
            {{ manualTraditional }}
          </div>
        </div>

        <!-- Timeline -->
        <div class="space-y-1">
          <p class="font-semibold">时辰速查</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            <div
              v-for="slot in timeline"
              :key="slot.hour"
              class="inline-flex items-center justify-around gap-2 rounded-full border border-border/60 dark:border-border/30 bg-white/70 dark:bg-black/20 px-3 py-1 shadow-2xs shadow-emerald-950/30"
            >
              <span class="font-semibold">{{ slot.label }}</span>
              <span class="text-emerald-700 dark:text-emerald-200">{{ slot.branch }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
