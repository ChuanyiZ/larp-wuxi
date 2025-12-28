<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toOpening = () => router.push('/opening')
const toTasks = () => router.push('/tasks')
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-[#032b52] to-[#021827] text-white flex flex-col">
    <header class="flex items-center px-5 py-3 bg-white/5 backdrop-blur gap-2">
      <button
        class="bg-transparent border-b border-dotted border-white/70 text-white cursor-pointer font-semibold px-3 py-1 hover:bg-white/5"
        @click="toOpening"
      >
        开场
      </button>
      <button
        class="bg-transparent border-b border-dotted border-white/70 text-white cursor-pointer font-semibold px-3 py-1 hover:bg-white/5"
        @click="toTasks"
      >
        差务
      </button>
    </header>

    <main class="flex-1 flex items-center justify-center" style="writing-mode: vertical-rl">
      <h1
        class="text-4xl tracking-wider pb-2 m-0 whitespace-nowrap cursor-default font-bold"
        style="font-family: 'Source Han Serif CN VF', serif"
      >
        【无锡急差】
      </h1>
    </main>
  </div>
</template>
