<template>
  <div
    class="root"
    :class="{hovered}"
    :style="{
      width: `${rect.w}px`,
      height: `${rect.h}px`,
      transform: `translate(${rect.x}px, ${rect.y}px)`,
    }"
  >
    <div class="actions">
      <a href="" @click.prevent="handleClick">Open in Studio</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {OverlayRect} from '@sanity/visual-editing'

const emit = defineEmits<{
  (e: 'open'): void
}>()

const props = defineProps<{
  hovered: boolean
  rect: OverlayRect
}>()

const handleClick = () => {
  emit('open')
}
</script>

<style scoped>
.root {
  border-radius: 3px;
  opacity: 0;
  outline-color: rgb(0, 150, 0);
  outline-offset: 0px;
  outline-style: solid;
  outline-width: 1px;
  pointer-events: none;
  position: absolute;
  will-change: transform;
}

.root.hovered {
  opacity: 1;
}

.actions {
  bottom: 100%;
  cursor: pointer;
  padding-bottom: 0.25em;
  pointer-events: none;
  position: absolute;
  right: 0;
}

.actions > * {
  background-color: rgb(0, 150, 0);
  border-radius: 3px;
  color: white;
  font-size: 12px;
  padding: 0.25em 0.5em;
}

.root.hovered .actions {
  pointer-events: all;
}
</style>
