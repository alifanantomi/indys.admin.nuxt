import { defineStore } from "pinia";
import type { User, UserResponse } from "@/lib/types/auth";
import { useAuthStore } from "./auth";

export const useUserStore = defineStore("user", () => {
  const users = ref<User[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchUsers = async () => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<UserResponse>("/v1/user", {
        baseURL: config.public.apiBase,
        headers: { Authorization: `Bearer ${authStore.token}` },
      });

      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to fetch users");
      }

      if (data.value) {
        users.value = data.value.data;
        return data.value;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch users";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    users,
    isLoading,
    error,
    fetchUsers,
  };
});
