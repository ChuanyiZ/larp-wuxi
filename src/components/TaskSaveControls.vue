<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTaskStore } from '@/stores/tasks'

const taskStore = useTaskStore()

const showModal = ref(false)
const newSaveName = ref('')
const message = ref('')

const snapshotName = computed(() => taskStore.snapshotName)
const activeId = computed(() => taskStore.activeId)
const snapshots = computed(() => taskStore.snapshots)

const openModal = () => {
  showModal.value = true
  newSaveName.value = ''
  message.value = ''
}

const closeModal = () => {
  showModal.value = false
}

const resetSave = () => {
  taskStore.resetStatuses()
  message.value = '已重置当前存档进度'
}

const startNew = () => {
  const name = newSaveName.value.trim() || '新的存档'
  taskStore.startNewSave(name)
  message.value = `已创建并切换到「${name}」`
  newSaveName.value = ''
}

const activate = (id: string) => {
  taskStore.activateSnapshot(id)
  message.value = '已切换存档'
}
</script>

<template>
  <div>
    <button type="button" class="pill-btn" @click="openModal">存档管理</button>

    <div v-if="showModal" class="modal-backdrop">
      <div class="modal">
        <header class="flex items-start justify-between gap-3">
          <div>
            <p class="text-xs uppercase tracking-[0.18em] opacity-60">存档管理</p>
            <h2 class="text-lg font-semibold">当前存档：{{ snapshotName }}</h2>
          </div>
          <button type="button" class="pill-btn" @click="closeModal">关闭</button>
        </header>

        <div class="space-y-4 mt-4">
          <div class="space-y-2">
            <label class="text-sm font-semibold">可用存档</label>
            <div class="flex flex-col gap-2 max-h-56 overflow-auto pr-1">
              <button
                v-for="snap in snapshots"
                :key="snap.id"
                type="button"
                class="flex items-center justify-between px-3 py-2 rounded-lg border border-border/70 dark:border-border/40"
                :class="
                  snap.id === activeId
                    ? 'bg-surface-strong/60 dark:bg-surface-strong/50 font-semibold'
                    : 'bg-transparent'
                "
                @click="activate(snap.id)"
              >
                <span class="text-sm">{{ snap.name }}</span>
                <span v-if="snap.id === activeId" class="text-xs opacity-70">当前</span>
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold">当前存档操作</label>
            <div class="flex flex-wrap gap-2">
              <button type="button" class="pill-btn" @click="resetSave">重置当前进度</button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-semibold">新建存档</label>
            <input
              v-model="newSaveName"
              type="text"
              class="w-full rounded-lg border border-border/70 dark:border-border/40 bg-transparent px-3 py-2 text-sm"
              placeholder="输入新存档名称"
            />
            <button type="button" class="pill-btn" @click="startNew">创建并切换</button>
          </div>

          <p v-if="message" class="text-xs opacity-70">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pill-btn {
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  border: 1px solid color-mix(in srgb, currentColor 25%, transparent);
  background-color: color-mix(in srgb, currentColor 6%, transparent);
  font-weight: 600;
  transition:
    background-color 120ms ease,
    border-color 120ms ease;
}

.pill-btn:hover {
  border-color: color-mix(in srgb, currentColor 40%, transparent);
  background-color: color-mix(in srgb, currentColor 12%, transparent);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, black 45%, transparent);
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 30;
}

.modal {
  width: min(600px, 100%);
  background: var(--color-surface, white);
  color: inherit;
  border-radius: 1rem;
  border: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  padding: 1.25rem;
  box-shadow: 0 20px 60px color-mix(in srgb, black 35%, transparent);
}
</style>
