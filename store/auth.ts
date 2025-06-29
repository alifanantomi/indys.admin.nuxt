import { defineStore, skipHydrate } from "pinia";
import type { AuthResponse, User, UserRole } from "@/lib/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = useCookie<User | null>("user", { 
    default: () => null,
    watch: true 
  });
  const token = useCookie<string | null>("token", { 
    default: () => null,
    watch: true 
  });
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    const config = useRuntimeConfig()

    isLoading.value = true;
    error.value = null;
    
    try {
      const { data, error: fetchError } = await useFetch<AuthResponse>("/v1/auth/login", {
        baseURL: config.public.apiBase,
        method: "POST",
        body: credentials,
      });

      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Login failed");
      }

      if (data.value) {
        const userResponse = data.value.data

        user.value = userResponse;
        token.value = data.value.data.token || "";

        return data.value;
      }
    } catch (err: any) {
      console.log(err);
      
      error.value = err.message || "Login error";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchUser = async () => {
    // Skip if we're on the server or if we don't have a token
    if (process.server || !token.value) {
      return;
    }

    isLoading.value = true;
    error.value = null;
    
    try {
      const { data, error: fetchError } = await useFetch<User>("/api/me", {
        headers: { Authorization: `Bearer ${token.value}` },
      });

      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to fetch user");
      }

      if (data.value) {
        user.value = data.value;
        return data.value;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch user";
      user.value = null;
      token.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    // Optional: Call logout API endpoint
    // await useFetch("/api/auth/logout", { method: "POST" });
    
    user.value = null;
    token.value = null;
  };

  const hasRole = (requiredRoles: UserRole[]) => {
    return user.value ? requiredRoles.includes(user.value.access) : false;
  };

  return {
    user: skipHydrate(user),
    token: skipHydrate(token),
    isLoading,
    error,
    login,
    fetchUser,
    logout,
    isAuthenticated: computed(() => !!user.value && !!token.value),
    hasRole
  };
});