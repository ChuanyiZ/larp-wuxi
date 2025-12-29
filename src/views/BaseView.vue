<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import TaskClock from '@/components/TaskClock.vue'
</script>

<template>
  <div
    class="min-h-svh flex flex-col justify-between m-auto bg-surface text-foreground transition-colors duration-300"
  >
    <RouterView v-slot="{ Component, route }">
      <AppHeader>
        <template #tools>
          <TaskClock v-if="route.name === 'tasks'" />
        </template>
      </AppHeader>

      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <AppFooter />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
