<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import OpeningContent from '@/content/OpeningContent.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col m-auto bg-surface text-foreground transition-colors duration-300">
    <AppHeader />

    <main class="container lg:max-w-[70vw] mx-auto my-.5 px-4">
      <OpeningContent />
    </main>
  </div>
</template>
