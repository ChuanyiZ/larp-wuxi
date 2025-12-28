<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div
    class="min-h-dvh flex flex-col m-auto bg-surface text-foreground transition-colors duration-300"
  >
    <AppHeader />

    <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
            <component :is="Component" />
        </Transition>
    </router-view>

    <AppFooter />
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 250ms;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
