import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'dashboard' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const { error, isAuthenticated, isInitialized } = storeToRefs(authStore)

  if (!isInitialized.value) {
    await authStore.initialize()

    if (import.meta.env.DEV && error.value) {
      console.error('Auth initialization failed', error.value)
    }
  }

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  if (to.path === '/login' && isAuthenticated.value) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
