<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { openingBlocks, type OpeningNode } from './openingData'

const slipRefs = ref<HTMLElement[]>([])

const setSlipRef = (el: HTMLElement | null) => {
  if (el && !slipRefs.value.includes(el)) {
    slipRefs.value.push(el)
  }
}

onMounted(() => {
  slipRefs.value.forEach((el) => el.scroll(9999, 0))
})

const isVertical = (node: OpeningNode): node is Extract<OpeningNode, { type: 'vertical' }> =>
  node.type === 'vertical'
</script>

<template>
  <template v-for="(block, idx) in openingBlocks" :key="idx">
    <div v-if="isVertical(block)" :class="block.containerClass" ref="setSlipRef">
      <div class="vertical-chinese" :class="block.class">
        <template v-for="(child, i) in block.children" :key="i">
          <p v-if="child.type === 'p'" :class="child.class">
            <template v-if="child.bold"
              ><b>{{ child.text }}</b></template
            >
            <template v-else>{{ child.text }}</template>
            <span v-if="child.note" class="note">（{{ child.note }}）</span>
          </p>
          <ol v-else-if="child.type === 'list'" :class="child.class">
            <li v-for="(item, j) in child.items" :key="j">
              {{ item.text }}
              <span v-if="item.note" class="note">（{{ item.note }}）</span>
            </li>
          </ol>
        </template>
      </div>
    </div>

    <p v-else-if="block.type === 'p'" :class="block.class">
      <template v-if="block.bold"
        ><b>{{ block.text }}</b></template
      >
      <template v-else>{{ block.text }}</template>
      <span v-if="block.note" class="note">（{{ block.note }}）</span>
    </p>

    <ol v-else-if="block.type === 'list'" :class="block.class">
      <li v-for="(item, i) in block.items" :key="i">
        {{ item.text }}
        <span v-if="item.note" class="note">（{{ item.note }}）</span>
      </li>
    </ol>
  </template>
</template>

<style scoped>
p {
  text-indent: 2em;
}

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

.vertical-chinese p {
  text-indent: 0;
  padding-inline-start: 2em;
}

.vertical-chinese b {
  font-weight: 700;
}

.vertical-chinese ol {
  list-style-position: inside;
}

.vertical-chinese ol li {
  padding-inline-start: 2.2em;
  text-indent: -2.2em;
}

.vertical-chinese ol.counter-traditional li::before {
  content: counter(list-item, chinese-traditional) '·';
}

.vertical-chinese ol.counter-ten-stems li::before {
  content: counter(list-item, chinese-ten-stems) '·';
}

.vertical-chinese .note {
  font-size: 0.5em;
  font-family: sans-serif;
  font-weight: 300;
  line-height: 1.5em;
}
</style>
