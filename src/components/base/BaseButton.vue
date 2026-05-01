<script setup lang="ts">
import { computed } from 'vue'

import type { ButtonVariant, RoundedTypes } from '@/types/ui'

interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  rounded?: RoundedTypes
  customColor?: string
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'button',
  variant: 'default',
  rounded: 'md',
  customColor: undefined,
  loading: false,
  disabled: false,
})

const isDisabled = computed(() => props.disabled || props.loading)

const roundedClassMap: Record<RoundedTypes, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
  none: 'rounded-none',
}

const variantClassMap: Record<ButtonVariant, string> = {
  default: 'bg-mossy-main border-mossy-main text-white hover:bg-mossy-700 hover:border-mossy-700',
  outline: 'bg-transparent border-mossy-main text-mossy-main hover:bg-mossy-main hover:text-white',
}

const classes = computed(() => {
  const customColorClass =
    props.customColor &&
    !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(props.customColor.trim())
      ? props.customColor.trim()
      : ''

  return [
    'base-button',
    roundedClassMap[props.rounded],
    variantClassMap[props.variant],
    customColorClass,
  ]
    .filter(Boolean)
    .join(' ')
})

const customStyles = computed(() => {
  if (!props.customColor) return undefined

  const color = props.customColor.trim()
  const isHexColor = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(color)

  if (isHexColor) {
    return props.variant === 'outline'
      ? { borderColor: color, color }
      : { backgroundColor: color, borderColor: color }
  }

  return undefined
})
</script>

<template>
  <button :class="classes" :style="customStyles" :type="type" :disabled="isDisabled">
    <span v-if="loading" class="base-button__spinner" aria-hidden="true"></span>
    <span class="base-button__label"><slot /></span>
  </button>
</template>

<style scoped>
@reference "../../assets/main.css";

.base-button {
  @apply inline-flex items-center justify-center gap-2 border px-4 py-3 font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mossy-main focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
}

.base-button:hover:not(:disabled) {
  @apply cursor-pointer;
  filter: brightness(0.92);
}

.base-button__spinner {
  @apply h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent;
}

.base-button__label {
  @apply leading-none;
}
</style>
