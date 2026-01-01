<script setup lang="ts">
import VerticalChinese from '@/components/VerticalChinese.vue'
import { openingBlocks, type OpeningNode } from './openingData'

const isVertical = (node: OpeningNode): node is Extract<OpeningNode, { type: 'vertical' }> =>
  node.type === 'vertical'
</script>

<template>
  <template v-for="(block, idx) in openingBlocks" :key="idx">
    <VerticalChinese
      v-if="isVertical(block)"
      :container-class="block.containerClass"
      :content-class="block.class"
    >
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
    </VerticalChinese>

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
