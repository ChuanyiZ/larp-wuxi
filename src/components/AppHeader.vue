<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/vue/24/solid'

type NavItem = {
  label: string
  to: string
}

const props = withDefaults(
  defineProps<{
    navItems?: NavItem[]
  }>(),
  {
    navItems: () => [
      { label: '封面', to: '/cover' },
      { label: '开场', to: '/opening' },
    ],
  },
)

const route = useRoute()

const normalizePath = (path: string) => {
  if (path !== '/' && path.endsWith('/')) {
    return path.slice(0, -1)
  }
  return path
}

const isActive = (target: string) => normalizePath(route.path) === normalizePath(target)

type ThemeMode = 'light' | 'dark' | 'system'
type ThemeValue = 'light' | 'dark'

const ThemeKey = '__wuxi_theme_mode';
const mode = ref<ThemeMode>('system')
const systemPrefersDark = ref(false)
let mediaQuery: MediaQueryList | null = null

const actualTheme = computed<ThemeValue>(() =>
  mode.value === 'system' ? (systemPrefersDark.value ? 'dark' : 'light') : mode.value,
)

const applyTheme = (selected: ThemeMode) => {
  mode.value = selected
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.dataset.theme = actualTheme.value
  localStorage.setItem(ThemeKey, selected)
}

const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
  systemPrefersDark.value = event.matches
  if (mode.value === 'system') {
    applyTheme('system')
  }
}

const toggleTheme = () => {
  const next: ThemeMode =
    mode.value === 'light' ? 'dark' : mode.value === 'dark' ? 'system' : 'light'
  applyTheme(next)
}

const themeLabel = computed(() => {
  if (mode.value === 'system') return '系统'
  return actualTheme.value === 'dark' ? '深色' : '浅色'
})

const themeIcon = computed(() => {
  if (mode.value === 'system') return ComputerDesktopIcon
  return actualTheme.value === 'dark' ? MoonIcon : SunIcon
})

onMounted(() => {
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  handleMediaChange(mediaQuery)
  mediaQuery.addEventListener('change', handleMediaChange)

  const stored = localStorage.getItem(ThemeKey) as ThemeMode | null
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    applyTheme(stored)
    return
  }

  applyTheme('system')
})

onBeforeUnmount(() => {
  if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleMediaChange)
  }
})
</script>

<template>
  <header
    class="flex items-center justify-between gap-4 px-1 md:px-3 lg:px-10 py-2 bg-surface-strong/70 dark:bg-surface-strong/50 backdrop-blur border-b border-border/60 dark:border-border/50"
  >
    <nav class="flex items-center gap-2">
      <RouterLink
        v-for="item in props.navItems"
        :key="item.to"
        :to="item.to"
        class="nav-link"
        :data-active="isActive(item.to)"
        :aria-current="isActive(item.to) ? 'page' : undefined"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <div class="flex items-center gap-3">
      <button
        type="button"
        class="ghost-button"
        :aria-pressed="actualTheme === 'dark'"
        @click="toggleTheme"
        title="切换深浅色/跟随系统"
      >
        <span class="inline-flex items-center gap-1">
          <span aria-hidden="true" class="icon">
            <component :is="themeIcon" />
          </span>
          <span class="text-xs font-semibold">{{ themeLabel }}</span>
        </span>
      </button>
      <div class="flex items-center gap-2 justify-end">
        <slot name="tools" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  padding: 0.125rem 0.25rem;
  border-bottom: 1px solid transparent;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 250ms ease,
    border-color 250ms ease;
}

.nav-link:hover {
  background-color: color-mix(in srgb, currentColor 12%, transparent);
}

.nav-link[data-active='true'] {
  font-weight: 600;
  border-bottom: 1px solid currentColor;
}

.ghost-button {
  padding: 0.125rem 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  background-color: color-mix(in srgb, currentColor 6%, transparent);
  transition:
    background-color 150ms ease,
    border-color 150ms ease;
}

.ghost-button:hover {
  border-color: color-mix(in srgb, currentColor 35%, transparent);
  background-color: color-mix(in srgb, currentColor 12%, transparent);
}

.icon {
  width: 1rem;
  height: 1rem;
  display: inline-flex;
}
</style>
