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

    <main class="container lg:max-w-[70vw] mx-auto my-.5 px-4">
      <OpeningContent />
    </main>
  </div>
</template>
