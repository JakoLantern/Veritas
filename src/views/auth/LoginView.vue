<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { error, isAuthenticated } = storeToRefs(authStore)
const route = useRoute()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const formErrors = reactive({
  email: '',
  password: '',
})

const isSubmitting = ref(false)

const isEmailValid = computed(() => /^\S+@\S+\.\S+$/.test(form.email.trim()))
const canSubmit = computed(
  () => isEmailValid.value && form.password.trim() !== '' && !isSubmitting.value,
)

function validateForm() {
  formErrors.email = isEmailValid.value ? '' : 'Enter a valid email address.'
  formErrors.password = ''

  return !formErrors.email
}

function resolveRedirectTarget() {
  const redirect = route.query.redirect
  const target = Array.isArray(redirect) ? redirect[0] : redirect

  return typeof target === 'string' && target.startsWith('/') ? target : '/'
}

async function handleSubmit() {
  error.value = null

  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    if (isAuthenticated.value) {
      await router.push('/dashboard')
      return
    }

    const success = await authStore.login(form.email.trim(), form.password)

    if (success) {
      await router.push(resolveRedirectTarget())
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="login-view">
    <BaseCard class="login-view__form" shadow="xl" background="bg-white">
      <form class="login-view__form-inner" @submit.prevent="handleSubmit" novalidate>
        <header class="login-view__header">
          <h1 class="login-view__title text-primary font-bold">Welcome Back</h1>
          <p class="login-view__subtitle">Access your Ledger workspace securely.</p>
        </header>

        <div v-if="error" class="login-error-msg" role="alert" aria-live="polite">
          {{ error }}
        </div>

        <div class="login-view__field">
          <label class="login-view__label" for="login-email">Email</label>
          <input
            id="login-email"
            v-model="form.email"
            class="login-view__input"
            type="email"
            autocomplete="email"
            inputmode="email"
            required
          />
          <p v-if="formErrors.email" class="login-view__help" role="alert">
            {{ formErrors.email }}
          </p>
        </div>

        <div class="login-view__field">
          <label class="login-view__label" for="login-password">Password</label>
          <input
            id="login-password"
            v-model="form.password"
            class="login-view__input"
            type="password"
            autocomplete="current-password"
            required
          />
          <p v-if="formErrors.password" class="login-view__help" role="alert">
            {{ formErrors.password }}
          </p>
        </div>

        <BaseButton
          class="login-view__submit"
          type="submit"
          :loading="isSubmitting"
          :disabled="!canSubmit"
        >
          Sign in
        </BaseButton>
      </form>
    </BaseCard>
  </main>
</template>

<style scoped>
@reference "../../assets/main.css";

.login-view {
  @apply flex min-h-screen items-center justify-center bg-white px-4 py-8;
}

.login-view__form {
  @apply w-full max-w-md border border-primary-50 shadow-lg;
}

.login-view__form-inner {
  @apply grid gap-5 p-6 sm:p-8;
}

.login-view__header {
  @apply grid gap-1;
}

.login-view__title {
  @apply text-2xl;
}

.login-view__subtitle {
  @apply text-sm text-secondary-500;
}

.login-view__field {
  @apply grid gap-2;
}

.login-view__label {
  @apply text-sm font-medium text-secondary-700;
}

.login-view__input {
  @apply min-h-11 rounded-[var(--radius-lg)] border border-primary-50 bg-white px-4 py-3 text-secondary-900 outline-none transition-shadow duration-200;
}

.login-view__input:focus {
  @apply shadow-[0_0_0_3px_rgba(232,234,233,0.75)];
}

.login-view__help {
  @apply text-sm text-danger-main;
}

.login-error-msg {
  @apply rounded-[var(--radius-lg)] border border-danger-100 bg-danger-30 px-4 py-3 text-sm text-danger-700;
}

.login-view__submit {
  @apply w-full;
}
</style>
