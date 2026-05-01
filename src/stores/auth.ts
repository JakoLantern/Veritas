import { computed, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/clients/supabase.js'

export const useAuthStore = defineStore('auth', () => {
  const user = shallowRef<User | null>(null)
  const isInitialized = shallowRef(false)
  const error = shallowRef<string | null>(null)

  const isAuthenticated = computed(() => user.value !== null)
  const authStatus = computed(() => {
    if (!user.value) {
      return 'Signed out'
    }

    return `Signed in as ${user.value.email ?? 'Authenticated user'}`
  })

  async function initialize() {
    error.value = null

    try {
      const { data, error: authError } = await supabase.auth.getUser()

      user.value = data.user ?? null
    } catch (caughtError) {
      user.value = null
      if (caughtError instanceof Error) {
        const isMissingSession = caughtError.message.toLowerCase().includes('auth session missing')

        if (!isMissingSession) {
          error.value = caughtError.message
        }
      }
    } finally {
      isInitialized.value = true
    }
  }

  async function login(email: string, password: string) {
    error.value = null

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      user.value = null
      error.value = authError.message
      return false
    }

    user.value = data.user ?? null
    return true
  }

  async function logout() {
    error.value = null

    const { error: authError } = await supabase.auth.signOut()

    if (authError) {
      error.value = authError.message
      return false
    }

    user.value = null
    return true
  }

  return {
    user,
    isInitialized,
    error,
    isAuthenticated,
    authStatus,
    initialize,
    login,
    logout,
  }
})
