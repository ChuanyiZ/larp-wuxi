<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div
    class="min-h-screen flex flex-col text-foreground bg-gradient-to-b from-[#e5edf8] to-[#c8d5ea] dark:from-[#032b52] dark:to-[#021827] dark:text-white transition-colors duration-300"
  >
    <AppHeader />

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
