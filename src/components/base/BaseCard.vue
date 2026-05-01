<script setup lang="ts">
import { computed } from 'vue'

import { hoverMap, shadowClassMap, type CardProps } from './BaseCard.types'

const props = withDefaults(defineProps<CardProps>(), {
  background: 'bg-white',
  shadow: 'md',
  clickable: false,
})

const classes = computed(() => {
  const shadow = props.shadow
  const base = [
    'base-card',
    'p-4',
    props.background,
    shadowClassMap[shadow],
    hoverMap[shadow],
    'transition-shadow',
    'duration-200',
    'outline-none',
  ]

  if (props.clickable) base.push('cursor-pointer')

  return base.filter(Boolean).join(' ')
})

const clickableAttrs = computed(() => (props.clickable ? { role: 'button', tabindex: 0 } : {}))

const style = {
  border: '1px solid var(--color-primary-50)',
  borderRadius: 'var(--radius-lg)',
}
</script>

<template>
  <div :class="classes" :style="style" v-bind="clickableAttrs">
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  display: block;
}
</style>
