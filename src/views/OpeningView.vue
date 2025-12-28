<script setup lang="ts">
import OpeningContent from '@/content/OpeningContent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const toCover = () => router.push('/cover')
const toTasks = () => router.push('/tasks')
</script>

<template>
  <div class="min-h-screen flex flex-col m-auto">
    <header class="flex justify-center items-center px-5 py-1 bg-white/5 backdrop-blur gap-3">
      <button
        class="bg-transparent border-b border-dotted border-black/70 cursor-pointer font-semibold px-1 hover:bg-white/5"
        @click="toCover"
      >
        封面
      </button>
      <button
        class="bg-transparent border-b border-dotted border-black/70 cursor-pointer font-semibold px-1 hover:bg-white/5"
        @click="toTasks"
      >
        差务
      </button>
    </header>

    <main class="mx-1 px-1 py-1 overflow-scroll bg-paper-100 drop-shadow-lg/50 drop-shadow-paper-500 ">
      <div class="vertical-chinese h-[80vh]">
        <OpeningContent />
      </div>
    </main>
  </div>
</template>

<style>

.vertical-chinese {
  writing-mode: vertical-rl;
  text-orientation: upright;
  line-height: 1.5em;
  font-size: 1em;
  outline: 0.3em double hsl(217, 37%, 40%);
  margin: 0.3em;
  background-size: 1.5em 100%;
  background-image: linear-gradient(to left, transparent 1.4em, hsl(217, 37%, 40%) 0.1em);
  font-family: 'Source Han Serif CN VF', serif;
  font-weight: 500;
}

.vertical-chinese p {
  text-indent: 2em;
  margin-block-end: 1.5em;
}

.vertical-chinese b {
  font-weight: 700;
}

.vertical-chinese .indent-0 {
  text-indent: 0;
}

.vertical-chinese .m-be-0 {
  margin-block-end: 0;
}

.vertical-chinese ol {
  margin-block-end: 1.5em;
  list-style-position: inside;
}

.vertical-chinese ol li {
  padding-inline-start: 2.2em;
  text-indent: -2.2em;
}

.vertical-chinese ol li::before {
  content: counter(list-item, chinese-traditional) "、";
  margin-inline-end: 0.2em;
}
</style>
