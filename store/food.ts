import { defineStore } from "pinia";
import type { Food } from "@/lib/types/transaction";
import { useAuthStore } from "./auth";

export const useFoodStore = defineStore("food", () => {
  const foods = ref<Food[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchFoods = async () => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<Food[]>("/v1/foods", {
        baseURL: config.public.apiBase,
        headers: { Authorization: `Bearer ${authStore.token}` },
      });

      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to fetch foods");
      }

      if (data.value) {
        foods.value = data.value;
        return data.value;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to fetch foods";
    } finally {
      isLoading.value = false;
    }
  };

  const createFood = async (newFood: Omit<Food, 'id' | 'createdAt' | 'updatedAt'>) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      throw new Error("Not authenticated");
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<Food>("/v1/foods", {
        baseURL: config.public.apiBase,
        method: "POST",
        headers: { Authorization: `Bearer ${authStore.token}` },
        body: newFood,
      });

      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to create food");
      }

      if (data.value) {
        foods.value.push(data.value);
        return data.value;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to create food";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateFood = async (id: number, updatedFood: Partial<Food>) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      throw new Error("Not authenticated");
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await useFetch<Food>(
        `/v1/foods/${id}`,
        {
          baseURL: config.public.apiBase,
          method: "PUT",
          headers: { Authorization: `Bearer ${authStore.token}` },
          body: updatedFood,
        }
      );

      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to update food");
      }

      if (data.value) {
        const index = foods.value.findIndex((f) => f.id === id);
        if (index !== -1) {
          foods.value[index] = data.value;
        }
        return data.value;
      }
    } catch (err: any) {
      error.value = err.message || "Failed to update food";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteFood = async (id: number) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if (!authStore.token) {
      throw new Error("Not authenticated");
    }

    isLoading.value = true;
    error.value = null;

    try {
      const { error: fetchError } = await useFetch(`/v1/foods/${id}`, {
        baseURL: config.public.apiBase,
        method: "DELETE",
        headers: { Authorization: `Bearer ${authStore.token}` },
      });

      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to delete food");
      }

      foods.value = foods.value.filter((f) => f.id !== id);
    } catch (err: any) {
      error.value = err.message || "Failed to delete food";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    foods,
    isLoading,
    error,
    fetchFoods,
    createFood,
    updateFood,
    deleteFood,
  };
});
