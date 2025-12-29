<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { toTraditionalTime } from '@/utils/ancientTime'

const now = ref(new Date())
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

const timeText = computed(() =>
  now.value.toLocaleTimeString("zh-CN", { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
)

const traditionalText = computed(() => toTraditionalTime(now.value))
</script>

<template>
  <div class="flex items-center gap-2 text-sm font-semibold" :title="timeText">
    <span class="text-xs opacity-80">{{ traditionalText }}</span>
  </div>
</template>
