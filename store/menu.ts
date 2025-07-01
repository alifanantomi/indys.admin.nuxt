import { defineStore, skipHydrate } from "pinia";
import type { Menu, MenuResponse } from "@/lib/types/transaction";
import { useAuthStore } from "./auth";

export const useMenuStore = defineStore("menu", () => {
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);
  const config = useRuntimeConfig();

  const menus = ref<Menu[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const fetchMenus = async () => {
    if (process.server || !token.value) return [];

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<MenuResponse>("/v1/food", {
        baseURL: config.public.apiBase,
        headers: { Authorization: `Bearer ${authStore.token}` },
        server: false,
      });

      console.log("PINIA")

      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to fetch menus");
      }

      if (data.value) {        
        menus.value = data.value.data;
        return data.value.data;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch menus";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    menus: skipHydrate(menus),
    isLoading: skipHydrate(isLoading),
    error,
    fetchMenus,
  };
});
