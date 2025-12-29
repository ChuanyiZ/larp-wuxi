<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { toTraditionalTime } from '@/utils/ancientTime'

const now = ref(new Date())
const showModern = ref<boolean>(false)
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
  now.value.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
)

const traditionalText = computed(() => toTraditionalTime(now.value))

const timeText = computed(() => (showModern.value ? modernText : traditionalText))
</script>

<template>
  <div
    class="text-sm font-semibold cursor-pointer opacity-80" :class="showModern ? 'min-w-16' : ''"
    @click="showModern = !showModern"
  >
    {{ timeText }}
  </div>
</template>
