import { useAuthStore } from "@/store/auth"

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (!auth.token && to.path !== '/login') {
    return navigateTo('/login')
  }
})
