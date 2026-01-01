<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineProps<{
  containerClass?: string
  contentClass?: string
}>()

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  if (el.value) {
    el.value.scroll(9999, 0)
  }
})
</script>

<template>
  <div ref="el" class="vertical-container" :class="containerClass">
    <div class="vertical-chinese" :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.vertical-container {
  max-width: 100vw;
  overflow-x: scroll;
  scrollbar-width: none;
}

.vertical-container::-webkit-scrollbar {
  display: none;
}

.vertical-chinese {
  writing-mode: vertical-rl;
  text-orientation: upright;
  line-height: 1.5em;
  font-size: 1em;
  border: 0.2em solid hsl(217, 37%, 40%);
  margin: 0.3em auto 0.3em auto;
  padding: 0.5em 0em 0.5em 0em;
  background-size: 1.5em 100%;
  background-image: linear-gradient(to left, transparent 1.4em, hsl(217, 37%, 40%) 0.1em);
  font-family: 'Source Han Serif CN VF', serif;
  font-weight: 500;
}

.vertical-chinese :deep(p) {
  text-indent: 0;
  padding-inline-start: 2em;
}

.vertical-chinese :deep(b) {
  font-weight: 700;
}

.vertical-chinese :deep(ol) {
  list-style-position: inside;
}

.vertical-chinese :deep(ol) li {
  padding-inline-start: 2.2em;
  text-indent: -2.2em;
}

.vertical-chinese :deep(ol.counter-traditional) li::before {
  content: counter(list-item, chinese-traditional) '·';
}

.vertical-chinese :deep(ol.counter-ten-stems) li::before {
  content: counter(list-item, chinese-ten-stems) '·';
}

.vertical-chinese :deep(.note) {
  font-size: 0.5em;
  font-family: sans-serif;
  font-weight: 300;
  line-height: 1.5em;
}
</style>
