import { UserRole } from '@/lib/types/auth'
import { useAuthStore } from '@/store/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  
  if (!auth.token) return navigateTo('/login')

  const requiredRoles = to.meta.roles as UserRole[] | undefined
  if (requiredRoles && !auth.hasRole(requiredRoles)) {
    if (auth.user?.access === UserRole.USER) {
      return navigateTo('/transactions')
    }

    return navigateTo('/403') // Redirect to an unauthorized page
  }
})
